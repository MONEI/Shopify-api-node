'use strict';

const map = {
  accessScope: () => require('./access-scope'),
  apiPermission: () => require('./api-permission'),
  applicationCharge: () => require('./application-charge'),
  applicationCredit: () => require('./application-credit'),
  article: () => require('./article'),
  asset: () => require('./asset'),
  balance: () => require('./balance'),
  blog: () => require('./blog'),
  cancellationRequest: () => require('./cancellation-request'),
  carrierService: () => require('./carrier-service'),
  checkout: () => require('./checkout'),
  collect: () => require('./collect'),
  collection: () => require('./collection'),
  collectionListing: () => require('./collection-listing'),
  comment: () => require('./comment'),
  country: () => require('./country'),
  currency: () => require('./currency'),
  customCollection: () => require('./custom-collection'),
  customer: () => require('./customer'),
  customerAddress: () => require('./customer-address'),
  customerSavedSearch: () => require('./customer-saved-search'),
  deprecatedApiCall: () => require('./deprecated-api-call'),
  discountCode: () => require('./discount-code'),
  discountCodeCreationJob: () => require('./discount-code-creation-job'),
  dispute: () => require('./dispute'),
  disputeEvidence: () => require('./dispute-evidence'),
  disputeFileUpload: () => require('./dispute-file-upload'),
  draftOrder: () => require('./draft-order'),
  event: () => require('./event'),
  fulfillment: () => require('./fulfillment'),
  fulfillmentEvent: () => require('./fulfillment-event'),
  fulfillmentOrder: () => require('./fulfillment-order'),
  fulfillmentRequest: () => require('./fulfillment-request'),
  fulfillmentService: () => require('./fulfillment-service'),
  giftCard: () => require('./gift-card'),
  giftCardAdjustment: () => require('./gift-card-adjustment'),
  inventoryItem: () => require('./inventory-item'),
  inventoryLevel: () => require('./inventory-level'),
  location: () => require('./location'),
  marketingEvent: () => require('./marketing-event'),
  metafield: () => require('./metafield'),
  order: () => require('./order'),
  orderRisk: () => require('./order-risk'),
  page: () => require('./page'),
  payment: () => require('./payment'),
  payout: () => require('./payout'),
  policy: () => require('./policy'),
  priceRule: () => require('./price-rule'),
  product: () => require('./product'),
  productImage: () => require('./product-image'),
  productListing: () => require('./product-listing'),
  productResourceFeedback: () => require('./product-resource-feedback'),
  productVariant: () => require('./product-variant'),
  province: () => require('./province'),
  recurringApplicationCharge: () => require('./recurring-application-charge'),
  redirect: () => require('./redirect'),
  refund: () => require('./refund'),
  report: () => require('./report'),
  resourceFeedback: () => require('./resource-feedback'),
  scriptTag: () => require('./script-tag'),
  shippingZone: () => require('./shipping-zone'),
  shop: () => require('./shop'),
  smartCollection: () => require('./smart-collection'),
  storefrontAccessToken: () => require('./storefront-access-token'),
  tenderTransaction: () => require('./tender-transaction'),
  theme: () => require('./theme'),
  transaction: () => require('./transaction'),
  usageCharge: () => require('./usage-charge'),
  user: () => require('./user'),
  webhook: () => require('./webhook')
};

/**
 * Registers resources on the `Shopify` class.
 *
 * @param {Shopify} Shopify The `Shopify` class
 * @private
 */
function registerAll(Shopify) {
  Object.entries(map).forEach(([resourceName, importResource]) => {
    Object.defineProperty(Shopify.prototype, resourceName, {
      configurable: true,
      get: function get() {
        const resource = importResource();

        return Object.defineProperty(this, resourceName, {
          value: new resource(this)
        })[resourceName];
      },
      set: function set(value) {
        Object.defineProperty(this, resourceName, { value });
      }
    });
  });
}

module.exports = {
  registerAll
};
