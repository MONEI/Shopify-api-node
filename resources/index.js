'use strict';

const map = {
  accessScope: 'access-scope',
  apiPermission: 'api-permission',
  applicationCharge: 'application-charge',
  applicationCredit: 'application-credit',
  article: 'article',
  asset: 'asset',
  balance: 'balance',
  blog: 'blog',
  cancellationRequest: 'cancellation-request',
  carrierService: 'carrier-service',
  checkout: 'checkout',
  collect: 'collect',
  collection: 'collection',
  collectionListing: 'collection-listing',
  comment: 'comment',
  country: 'country',
  currency: 'currency',
  customCollection: 'custom-collection',
  customer: 'customer',
  customerAddress: 'customer-address',
  customerSavedSearch: 'customer-saved-search',
  discountCode: 'discount-code',
  discountCodeCreationJob: 'discount-code-creation-job',
  dispute: 'dispute',
  draftOrder: 'draft-order',
  event: 'event',
  fulfillment: 'fulfillment',
  fulfillmentEvent: 'fulfillment-event',
  fulfillmentOrder: 'fulfillment-order',
  fulfillmentRequest: 'fulfillment-request',
  fulfillmentService: 'fulfillment-service',
  giftCard: 'gift-card',
  giftCardAdjustment: 'gift-card-adjustment',
  inventoryItem: 'inventory-item',
  inventoryLevel: 'inventory-level',
  location: 'location',
  marketingEvent: 'marketing-event',
  metafield: 'metafield',
  order: 'order',
  orderRisk: 'order-risk',
  page: 'page',
  payment: 'payment',
  payout: 'payout',
  policy: 'policy',
  priceRule: 'price-rule',
  product: 'product',
  productImage: 'product-image',
  productListing: 'product-listing',
  productResourceFeedback: 'product-resource-feedback',
  productVariant: 'product-variant',
  province: 'province',
  recurringApplicationCharge: 'recurring-application-charge',
  redirect: 'redirect',
  refund: 'refund',
  report: 'report',
  resourceFeedback: 'resource-feedback',
  scriptTag: 'script-tag',
  shippingZone: 'shipping-zone',
  shop: 'shop',
  smartCollection: 'smart-collection',
  storefrontAccessToken: 'storefront-access-token',
  tenderTransaction: 'tender-transaction',
  theme: 'theme',
  transaction: 'transaction',
  usageCharge: 'usage-charge',
  user: 'user',
  webhook: 'webhook'
};

/**
 * Registers resources on the `Shopify` class.
 *
 * @param {Shopify} Shopify The `Shopify` class
 * @private
 */
function registerAll(Shopify) {
  Object.keys(map).forEach((prop) => {
    Object.defineProperty(Shopify.prototype, prop, {
      configurable: true,
      get: function get() {
        const resource = require(`./${map[prop]}`);

        return Object.defineProperty(this, prop, {
          value: new resource(this)
        })[prop];
      },
      set: function set(value) {
        Object.defineProperty(this, prop, { value })[prop];
      }
    });
  });
}

module.exports = {
  registerAll
};
