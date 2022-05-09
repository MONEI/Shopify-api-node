const RetryableErrorCodes = new Set([
  'ETIMEDOUT',
  'ECONNRESET',
  'EADDRINUSE',
  'ECONNREFUSED',
  'EPIPE',
  'ENOTFOUND',
  'ENETUNREACH',
  'EAI_AGAIN'
]);

const responseFromError = (error) => {
  if ('response' in error) {
    const response = error.response;
    if (response && 'body' in response) {
      return response;
    }
  }
  return error;
};

const isRetryableConnectionError = (error) => {
  return (
    typeof error === 'object' &&
    'code' in error &&
    RetryableErrorCodes.has(error.code)
  );
};

/**
 * This provides methods used by request to decide weather to retry call or not
 *
 * @mixin
 */
const utils = {
  /**
   * When retrying requests to Shopify, we introduce a random amount of jitter to the retry time to avoid all making requests in lockstep in a thundering herd.
   * See https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ for more information
   * See https://github.com/tim-kos/node-retry#retryoperationoptions for an explanation of the math
   */
  addJitter: (baseRetrySeconds, attemptNumber) => {
    return (
      baseRetrySeconds + Math.min(Math.random() * Math.pow(2, attemptNumber), 6)
    );
  },

  shouldRetryError: (error) => {
    if (isRetryableConnectionError(error)) {
      return 0;
    }

    const response = responseFromError(error);
    if (!response) {
      return null;
    }

    if (response.headers['retry-after']) {
      const value = parseFloat(response.headers['retry-after']);
      if (isNaN(value)) {
        const when = new Date(value).valueOf();
        return when - Date.now().valueOf();
      } else if (isFinite(value)) {
        return value;
      } else {
        return null;
      }
    }

    if (
      response.statusCode == 429 ||
      (response.statusCode >= 500 && response.statusCode < 600)
    ) {
      // Arbitrary 2 seconds, in case we get a 429 without a Retry-After response header, or some 5xx response
      return 2;
    }

    // detect graphql request throttling
    if (response.body && typeof response.body === 'object') {
      const body = response.body;

      if (
        body.errors &&
        Array.isArray(body.errors) &&
        typeof body.errors[0] === 'object' &&
        body.errors[0].extensions?.code == 'THROTTLED'
      ) {
        const costData = body.extensions?.cost;
        if (costData) {
          return (
            (costData.requestedQueryCost -
              costData.throttleStatus.currentlyAvailable) /
            costData.throttleStatus.restoreRate
          );
        } else {
          return 2;
        }
      }
    }

    return null;
  }
};

module.exports = utils;
