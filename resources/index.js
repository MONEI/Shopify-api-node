const RESOURCES = {
  accessScope: 'access-scope',
  apiPermission: 'api-permission',
  applicationCharge: 'application-charge',
  applicationCredit: 'application-credit',
  article: 'article',
  asset: 'asset',
  balance: 'balance',
  blog: 'blog',
  carrierService: 'carrier-service',
  checkout: 'checkout',
  collect: 'collect',
  collectionListing: 'collection-listing',
  comment: 'comment',
  country: 'country',
  currency: 'currency',
  customCollection: 'custom-collection',
  customerAddress: 'customer-address',
  customerSavedSearch: 'customer-saved-search',
  customer: 'customer',
  discountCode: 'discount-code',
  dispute: 'dispute',
  draftOrder: 'draft-order',
  event: 'event',
  fulfillmentEvent: 'fulfillment-event',
  fulfillmentService: 'fulfillment-service',
  fulfillment: 'fulfillment',
  giftCardAdjustment: 'gift-card-adjustment',
  giftCard: 'gift-card',
  inventoryItem: 'inventory-item',
  inventoryLevel: 'inventory-level',
  location: 'location',
  marketingEvent: 'marketing-event',
  metafield: 'metafield',
  orderRisk: 'order-risk',
  order: 'order',
  page: 'page',
  payment: 'payment',
  payout: 'payout',
  policy: 'policy',
  priceRule: 'price-rule',
  productImage: 'product-image',
  productListing: 'product-listing',
  productVariant: 'product-variant',
  product: 'product',
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

//
// Require and instantiate the resources lazily.
//
function registerAll(Shopify) {
  Object.keys(RESOURCES).forEach(prop => {
    Object.defineProperty(Shopify.prototype, prop, {
      get: function get() {
        const resource = require(`./${RESOURCES[prop]}`);

        return Object.defineProperty(this, prop, {
          value: new resource(this)
        })[prop];
      },
      set: function set(value) {
        return Object.defineProperty(this, prop, { value })[prop];
      }
    });
  });
}

module.exports = {
  registerAll
};
