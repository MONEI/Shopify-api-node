// Type definitions for shopify-api-node 2.10.0
// Project: shopify-api-node
// Definitions by: Rich Buggy <rich@buggy.id.au>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = Shopify;

/*~ Write your module's methods and properties in this class */
type onCallLimitsFn = (limits: Shopify.ICallLimits) => void;

declare class Shopify {
    constructor(config: Shopify.IPublicShopifyConfig | Shopify.IPrivateShopifyConfig);
    callLimits: Shopify.ICallLimits;
    accessScope: {
        list: () => Promise<Shopify.IAccessScope[]>;
    };
    apiPermission: {
        delete: () => Promise<void>;
    };
    // abandonedCheckouts
    applicationCharge: {
        activate: (id: number, params?: any) => Promise<Shopify.IApplicationCharge>;
        create: (params: Shopify.ICreateApplicationCharge) => Promise<Shopify.IApplicationCharge>;
        get: (id: number, params?: any) => Promise<Shopify.IApplicationCharge>;
        list: (params?: any) => Promise<Shopify.IApplicationCharge[]>;
    };
    applicationCredit: {
        create: (params: Shopify.ICreateApplicationCredit) => Promise<Shopify.IApplicationCredit>;
        get: (id: number, params?: any) => Promise<Shopify.IApplicationCredit>;
        list: (params?: any) => Promise<Shopify.IApplicationCredit[]>;
    };
    article: {
        authors: () => Promise<string[]>;
        count: (blogId: number, params?: any) => Promise<number>;
        create: (blogId: number, params: Shopify.ICreateArticle) => Promise<Shopify.IArticle>;
        delete: (blogId: number, id: number) => Promise<void>;
        get: (blogId: number, id: number, params?: any) => Promise<Shopify.IArticle>;
        list: (blogId: number, params?: any) => Promise<Shopify.IArticle[]>;
        tags: (blogId?: number, params?: any) => Promise<string[]>;
        update: (blogId: number, id: number, params: Shopify.IUpdateArticle) => Promise<Shopify.IArticle>;
    };
    asset: {
        create: (themeId: number, params: any) => Promise<Shopify.IAsset>;
        delete: (themeId: number, params: any) => Promise<void>;
        get: (themeId: number, params?: any) => Promise<Shopify.IAsset>;
        list: (themeId: number, params?: any) => Promise<Shopify.IAsset[]>;
        update: (themeId: number, params: Shopify.IUpdateAsset) => Promise<Shopify.IAsset>;
    };
    blog: {
        count: () => Promise<number>;
        create: (params: Shopify.ICreateBlog) => Promise<Shopify.IBlog>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IBlog>;
        list: (params?: any) => Promise<Shopify.IBlog[]>;
        update: (id: number, params: any) => Promise<Shopify.IBlog>;
    };
    carrierService: {
        create: (params: Shopify.ICreateCarrierService) => Promise<Shopify.ICarrierService>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<Shopify.ICarrierService>;
        list: () => Promise<Shopify.ICarrierService[]>;
        update: (id: number, params: Shopify.IUpdateCarrierService) => Promise<Shopify.ICarrierService>;
    };
    checkout: {
        complete: (token: string) => Promise<any>;
        count: (params?: any) => Promise<number>;
        create: (params?: any) => Promise<Shopify.ICheckout>;
        get: (token: string) => Promise<Shopify.ICheckout>;
        list: (params?: any) => Promise<Shopify.ICheckout[]>;
        shippingRates: (token: string) => Promise<any>;
        update: (token: any, params: any) => Promise<Shopify.ICheckout>;
    };
    collect: {
        count: (params?: any) => Promise<number>;
        create: (params: Shopify.ICreateCollect) => Promise<Shopify.ICollect>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.ICollect>;
        list: (params?: any) => Promise<Shopify.ICollect[]>;
    };
    collectionListing: {
        get: (id: number, params?: any) => Promise<Shopify.ICollectionListing>;
        list: (params?: any) => Promise<Shopify.ICollectionListing[]>;
        productIds: (id: number) => Promise<any>;
    };
    comment: {
        approve: (id: number) => Promise<Shopify.IComment>;
        count: (params?: any) => Promise<number>;
        create: (params: Shopify.ICreateComment) => Promise<Shopify.IComment>;
        get: (id: number, params?: any) => Promise<Shopify.IComment>;
        list: (params?: any) => Promise<Shopify.IComment[]>;
        notSpam: (id: number) => Promise<Shopify.IComment>;
        remove: (id: number) => Promise<Shopify.IComment>;
        restore: (id: number) => Promise<Shopify.IComment>;
        spam: (id: number) => Promise<Shopify.IComment>;
        update: (id: number, params: Shopify.IUpdateComment) => Promise<Shopify.IComment>;
    };
    country: {
        count: () => Promise<number>;
        create: (params: Shopify.ICreateCountry) => Promise<Shopify.ICountry>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.ICountry>;
        list: (params?: any) => Promise<Shopify.ICountry[]>;
        update: (id: number, params: Shopify.IUpdateCountry) => Promise<Shopify.ICountry>;
    };
    customCollection: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.ICustomCollection>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.ICustomCollection>;
        list: (params?: any) => Promise<Shopify.ICustomCollection[]>;
        update: (id: number, params: any) => Promise<Shopify.ICustomCollection>;
    };
    customer: {
        accountActivationUrl: (id: number) => Promise<any>;
        count: () => Promise<number>;
        create: (params: any) => Promise<Shopify.ICustomer>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.ICustomer>;
        list: (params: any) => Promise<Shopify.ICustomer[]>;
        search: (params: any) => Promise<any>;
        update: (id: number, params: any) => Promise<Shopify.ICustomer>;
    };
    customerAddress: {
        create: (customerId: number, params: any) => Promise<Shopify.ICustomerAddress>;
        default: (customerId: number, id: number) => Promise<Shopify.ICustomerAddress>;
        delete: (customerId: number, id: number) => Promise<void>;
        get: (customerId: number, id: number) => Promise<Shopify.ICustomerAddress>;
        list: (customerId: number, params?: any) => Promise<Shopify.ICustomerAddress[]>;
        set: (customerId: number, params: any) => Promise<any>;
        update: (customerId: number, id: number, params: any) => Promise<Shopify.ICustomerAddress>;
    };
    customerSavedSearch: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.ICustomerSavedSearch>;
        customers: (id: number, params?: any) => Promise<any>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.ICustomerSavedSearch>;
        list: (params?: any) => Promise<Shopify.ICustomerSavedSearch[]>;
        update: (id: number, params: any) => Promise<Shopify.ICustomerSavedSearch>;
    };
    discountCode: {
        create: (priceRuleId: number, params: any) => Promise<Shopify.IDiscountCode>;
        delete: (priceRuleId: number, id: number) => Promise<void>;
        get: (priceRuleId: number, id: number) => Promise<Shopify.IDiscountCode>;
        list: (priceRuleId: number, params?: any) => Promise<Shopify.IDiscountCode[]>;
        lookup: (params: any) => Promise<Shopify.IDiscountCode>;
        update: (priceRuleId: number, id: number, params?: any) => Promise<Shopify.IDiscountCode>;
    };
    draftOrder: {
        complete: (id: number, params?: any) => Promise<Shopify.IDraftOrder>;
        count: () => Promise<number>;
        create: (params: any) => Promise<Shopify.IDraftOrder>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<Shopify.IDraftOrder>;
        list: (params?: any) => Promise<Shopify.IDraftOrder[]>;
        sendInvoice: (id: number, params?: any) => Promise<any>;
        update: (id: number, params?: any) => Promise<Shopify.IDraftOrder>;
    };
    event: {
        count: (params?: any) => Promise<number>;
        get: (id: number, params?: any) => Promise<Shopify.IEvent>;
        list: (params?: any) => Promise<Shopify.IEvent[]>;
    };
    fulfillment: {
        cancel: (orderId: number, id: number) => Promise<Shopify.IFulfillment>;
        complete: (orderId: number, id: number) => Promise<Shopify.IFulfillment>;
        count: (orderId: number, params?: any) => Promise<number>;
        create: (orderId: number, params: any) => Promise<Shopify.IFulfillment>;
        get: (orderId: number, id: number, params?: any) => Promise<Shopify.IFulfillment>;
        list: (orderId: number, params?: any) => Promise<Shopify.IFulfillment[]>;
        open: (orderId: number, id: number) => Promise<Shopify.IFulfillment>;
        update: (orderId: number, id: number, params: any) => Promise<Shopify.IFulfillment>;
    };
    fulfillmentEvent: {
        create: (orderId: number, fulfillmentId: number, params: any) => Promise<Shopify.IFulfillmentEvent>;
        delete: (orderId: number, fulfillmentId: number, id: number) => Promise<void>;
        get: (orderId: number, fulfillmentId: number, id: number) => Promise<Shopify.IFulfillmentEvent>;
        list: (orderId: number, fulfillmentId: number, params?: any) => Promise<Shopify.IFulfillmentEvent[]>;
        update: (orderId: number, fulfillmentId: number, id: number, params: any) => Promise<Shopify.IFulfillmentEvent>;
    };
    fulfillmentService: {
        create: (params: any) => Promise<Shopify.IFulfillmentService>;
        delete: (id: number) => Promise<void>;
        get: (id: number) => Promise<Shopify.IFulfillmentService>;
        list: (params?: any) => Promise<Shopify.IFulfillmentService[]>;
        update: (id: number, params: any) => Promise<Shopify.IFulfillmentService>;
    };
    giftCard: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.IGiftCard>;
        disable: (id: number) => Promise<any>;
        get: (id: number) => Promise<Shopify.IGiftCard>;
        list: (params?: any) => Promise<Shopify.IGiftCard[]>;
        search: (params: any) => Promise<any>;
        update: (id: number, params: any) => Promise<Shopify.IGiftCard>;
    };
    inventoryItem: {
        get: (id: number) => Promise<Shopify.IInventoryItem>;
        list: (params?: any) => Promise<Shopify.IInventoryItem[]>;
        update: (id: number, params: any) => Promise<Shopify.IInventoryItem>;
    };
    inventoryLevel: {
        adjust: (params: any) => Promise<Shopify.IInventoryLevel>;
        connect: (params: any) => Promise<Shopify.IInventoryLevel>;
        delete: (params: any) => Promise<void>;
        list: (params: any) => Promise<Shopify.IInventoryLevel[]>;
        set: (params: any) => Promise<Shopify.IInventoryLevel>;
    };
    location: {
        count: () => Promise<number>;
        get: (id: number) => Promise<Shopify.ILocation>;
        inventoryLevels: (id: number) => Promise<Shopify.IInventoryLevel[]>;
        list: () => Promise<Shopify.ILocation[]>;
    };
    marketingEvent: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.IMarketingEvent>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IMarketingEvent>;
        list: (params?: any) => Promise<Shopify.IMarketingEvent[]>;
        update: (id: number, params: any) => Promise<Shopify.IMarketingEvent>;
        engagements: (id: number, params: any) => Promise<any>;
    };
    metafield: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.IMetafield>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IMetafield>;
        list: (params?: any) => Promise<Shopify.IMetafield[]>;
        update: (id: number, params: any) => Promise<Shopify.IMetafield>;
    };
    on: (event: "callLimits", callback: onCallLimitsFn) => Shopify;
    order: {
        cancel: (id: number, params?: any) => Promise<Shopify.IOrder>;
        close: (id: number) => Promise<Shopify.IOrder>;
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.IOrder>;
        delete: (id: number) => Promise<any>;
        get: (id: number, params?: any) => Promise<Shopify.IOrder>;
        list: (params?: any) => Promise<Shopify.IOrder[]>;
        open: (id: number) => Promise<Shopify.IOrder>;
        update: (id: number, params: any) => Promise<Shopify.IOrder>;
    };
    orderRisk: {
        create: (orderId: number, params: any) => Promise<Shopify.IOrderRisk>;
        delete: (orderId: number, id: number) => Promise<void>;
        get: (orderId: number, id: number) => Promise<Shopify.IOrderRisk>;
        list: (orderId: number) => Promise<Shopify.IOrderRisk[]>;
        update: (orderId: number, id: number, params: any) => Promise<Shopify.IOrderRisk>;
    };
    page: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.IPage>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IPage>;
        list: (params?: any) => Promise<Shopify.IPage[]>;
        update: (id: number, params: any) => Promise<Shopify.IPage>;
    };
    payment: {
        count: (checkoutToken: string) => Promise<number>;
        create: (checkoutToken: string, params: any) => Promise<any>;
        get: (checkoutToken: string, id: number) => Promise<any>;
        list: (checkoutToken?: string) => Promise<any>;
    };
    policy: {
        list: (params?: any) => Promise<Shopify.IPolicy[]>;
    };
    priceRule: {
        create: (params: any) => Promise<Shopify.IPriceRule>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IPriceRule>;
        list: (params?: any) => Promise<Shopify.IPriceRule[]>;
        update: (id: number, params: any) => Promise<Shopify.IPriceRule>;
    };
    product: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.IProduct>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IProduct>;
        list: (params?: any) => Promise<Shopify.IProduct[]>;
        update: (id: number, params: any) => Promise<Shopify.IProduct>;
    };
    productImage: {
        count: (productId: number, params?: any) => Promise<number>;
        create: (productId: number, params: any) => Promise<Shopify.IProductImage>;
        delete: (productId: number, id: number) => Promise<void>;
        get: (productId: number, id: number, params?: any) => Promise<Shopify.IProductImage>;
        list: (productId: number, params?: any) => Promise<Shopify.IProductImage[]>;
        update: (productId: number, id: number, params: any) => Promise<Shopify.IProductImage>;
    };
    productListing: {
        count: () => Promise<number>;
        create: (productId: number, params: any) => Promise<Shopify.IProductListing>;
        delete: (productId: number) => Promise<void>;
        get: (productId: number) => Promise<Shopify.IProductListing>;
        list: (params?: any) => Promise<Shopify.IProductListing[]>;
        productIds: (params?: any) => Promise<any>;
    };
    productVariant: {
        count: (productId: number) => Promise<number>;
        create: (productId: number, params: any) => Promise<Shopify.IProductVariant>;
        delete: (productId: number, id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IProductVariant>;
        list: (productId: number, params?: any) => Promise<Shopify.IProductVariant[]>;
        update: (id: number, params: any) => Promise<Shopify.IProductVariant>;
    };
    province: {
        count: (countryId: number, params?: any) => Promise<number>;
        get: (countryId: number, id: number, params?: any) => Promise<Shopify.IProvince>;
        list: (countryId: number, params?: any) => Promise<Shopify.IProvince[]>;
        update: (countryId: number, id: number, params: any) => Promise<Shopify.IProvince>;
    };
    recurringApplicationCharge: {
        activate: (id: number, params: any) => Promise<Shopify.IRecurringApplicationCharge>;
        create: (params: Shopify.ICreateRecurringApplicationCharge) => Promise<Shopify.IRecurringApplicationCharge>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IRecurringApplicationCharge>;
        list: (params?: any) => Promise<Shopify.IRecurringApplicationCharge[]>;
    };
    redirect: {
        count: (params?: any) => Promise<number>;
        create: (params: Shopify.ICreateRedirect) => Promise<Shopify.IRedirect>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IRedirect>;
        list: (params?: any) => Promise<Shopify.IRedirect[]>;
        update: (id: number, params: Shopify.IUpdateRedirect) => Promise<Shopify.IRedirect>;
    };
    refund: {
        calculate: (orderId: number, params: any) => Promise<any>;
        create: (orderId: number, params: any) => Promise<Shopify.IRefund>;
        get: (orderId: number, id: number, params?: any) => Promise<Shopify.IRefund>;
        list: (orderId: number, params?: any) => Promise<Shopify.IRefund[]>;
    };
    report: {
        create: (params: any) => Promise<Shopify.IReport>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IReport>;
        list: (params?: any) => Promise<Shopify.IReport[]>;
        update: (id: number, params: any) => Promise<Shopify.IReport>;
    };
    resourceFeedback: {
        create: (params: any) => Promise<Shopify.IResourceFeedback>;
        list: () => Promise<Shopify.IResourceFeedback[]>;
    }
    scriptTag: {
        count: (params?: any) => Promise<number>;
        create: (params: Shopify.ICreateScriptTag) => Promise<Shopify.IScriptTag>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IScriptTag>;
        list: (params?: any) => Promise<Shopify.IScriptTag[]>;
        update: (id: number, params: Shopify.IUpdateScriptTag) => Promise<Shopify.IScriptTag>;
    };
    shippingZone: {
        list: (params?: any) => Promise<Shopify.IShippingZone[]>;
    };
    shop: {
        get: (params?: any) => Promise<Shopify.IShop>;
    };
    smartCollection: {
        count: (params?: any) => Promise<number>;
        create: (params: any) => Promise<Shopify.ISmartCollection>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.ISmartCollection>;
        list: (params?: any) => Promise<Shopify.ISmartCollection[]>;
        order: (id: number, params: any) => Promise<void>;
        update: (id: number, params: any) => Promise<Shopify.ISmartCollection>;
    };
    theme: {
        create: (params: any) => Promise<Shopify.ITheme>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params: any) => Promise<Shopify.ITheme>;
        list: (params?: any) => Promise<Shopify.ITheme[]>;
        update: (id: number, params: any) => Promise<Shopify.ITheme>;
    };
    transaction: {
        count: (orderId: number) => Promise<number>;
        create: (orderId: number, params: any) => Promise<Shopify.ITransaction>;
        get: (orderId: number, id: number, params?: any) => Promise<Shopify.ITransaction>;
        list: (orderId: number, params?: any) => Promise<Shopify.ITransaction[]>;
    };
    usageCharge: {
        create: (recurringApplicationChargeId: number, params: Shopify.ICreateUsageCharge) => Promise<Shopify.IUsageCharge>;
        get: (recurringApplicationChargeId: number, id: number, params?: any) => Promise<Shopify.IUsageCharge>;
        list: (recurringApplicationChargeId: number, params?: any) => Promise<Shopify.IUsageCharge[]>;
    };
    user: {
        current: () => Promise<Shopify.IUser>;
        get: (id: number) => Promise<Shopify.IUser>;
        list: () => Promise<Shopify.IUser[]>;
    };
    webhook: {
        count: (params?: any) => Promise<number>;
        create: (params: Shopify.ICreateWebhook) => Promise<Shopify.IWebhook>;
        delete: (id: number) => Promise<void>;
        get: (id: number, params?: any) => Promise<Shopify.IWebhook>;
        list: (params?: any) => Promise<Shopify.IWebhook[]>;
        update: (id: number, params: Shopify.IUpdateWebhook) => Promise<Shopify.IWebhook>;
    };
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace Shopify {
    export interface IAutoLimit {
        bucketSize: number;
        calls: number;
        interval: number;
    }

    export interface IPublicShopifyConfig {
        accessToken: string;
        autoLimit?: boolean | IAutoLimit;
        shopName: string;
        timeout?: number;
    }

    export interface IPrivateShopifyConfig {
        apiKey: string;
        autoLimit?: boolean | IAutoLimit;
        password: string;
        shopName: string;
        timeout?: number;
    }

    export interface ICallLimits {
        remaining: number;
        current: number;
        max: number;
    }

    interface IAccessScope {
        handle: string
    }

    interface ICheckout {
        abandoned_checkout_url: string;
        applied_discount?: ICheckoutDiscount[];
        billing_address?: ICustomerAddress;
        buyer_accepts_marketing: boolean;
        cancel_reason?: "customer" | "fraud" | "inventory" | "other" | null;
        cart_token: string;
        closed_at: string | null;
        completed_at: string | null;
        created_at: string;
        currency: string;
        customer: ICustomer;
        customer_locale: string;
        discount_code?: string;
        discount_codes?: ICheckoutDiscount[];
        device_id: number | null;
        email: string;
        gateway: string | null;
        gift_cards?: ICheckoutGiftCard;
        id: number;
        landing_site: string;
        line_items: ICheckoutLineItem[];
        location_id: number | null; // In API response but not documented
        note: string | null;
        note_attributes: any[];
        order?: ICheckoutOrder;
        payment_url?: string;
        phone: string | null;
        referring_site: string;
        request_details?: ICheckoutRequestDetails;
        requires_shipping?: boolean;
        reservation_time?: number;
        reservation_time_left?: number;
        shipping_address: ICustomerAddress;
        shipping_lines: ICheckoutShippingLine[];
        shipping_rates?: ICheckoutShippingRate[];
        shipping_rate?: ICheckoutShippingRate[];
        source_indentifier: string | null;
        source_name: string | null;
        source_url: string | null;
        subtotal_price: string;
        tax_lines: ICheckoutTaxLine[];
        taxes_included: boolean;
        token: string;
        total_discounts: string;
        total_line_items_price: string;
        total_price: string;
        total_tax: string;
        total_weight: number;
        updated_at: string;
        user_id: number | null; // In API response but not documented
        web_url?: string;
    }

    interface ICheckoutLineItem {
        applied_discounts: any[];
        compare_at_price: string;
        destination_location_id: number;
        discount_codes: any[];
        fulfillment_service: "api" | "custom" | "legacy" | "manual";
        fulfillment_status?: "fulfilled" | "partial" | null;
        gift_card: boolean;
        grams: number;
        key: string;
        line_price: string;
        name: string;
        origin_location_id: number;
        price: string;
        product_id: number;
        properties: any | null;
        quantity: number;
        requires_shipping: boolean;
        sku: string;
        taxable: boolean;
        tax_lines: ICheckoutTaxLine[];
        title: string;
        variant_id: number;
        variant_title: string;
        vendor: string;
    }

    interface ICheckoutShippingLine {
        api_client_id: number | null;
        applied_discounts: any[];
        carrier_identifier: any | null;
        carrier_service_id: number | null;
        code: string;
        delivery_category: any | null;
        id: string;
        markup: string;
        phone: string | null;
        price: string;
        requested_fulfillment_service_id: number | null;
        source: string;
        tax_lines: any[];
        title: string;
        validation_context: any | null;
    }

    interface ICheckoutTaxLine {
        compare_at: number;
        position: number;
        price: string;
        rate: number;
        source: string;
        title: string;
        zone: string;
    }

    interface IApplicationCharge {
        confirmation_url: string;
        created_at: string;
        id: number;
        name: string;
        price: string;
        return_url: string;
        status: "accepted" | "declined" | "expired" | "pending";
        test: true | null;
        updated_at: string;
    }

    interface ICreateApplicationCharge {
        name: string;
        price: string;
        return_url: string;
        status: "accepted" | "declined" | "expired" | "pending";
        test?: true;
    }

    interface IApplicationCredit {
        description: string;
        id: number;
        amount: string;
        test: true | null;
    }

    interface ICreateApplicationCredit {
        description: string;
        amount: string;
        test?: true;
    }

    interface IArticle {
        author: string;
        blog_id: number;
        body_html: string;
        created_at: string;
        id: number;
        handle: string;
        image: IImage;
        metafields: IObjectMetafield[];
        published: boolean;
        published_at: string;
        summary_html: string | null;
        tags: string;
        template_suffix: string | null;
        title: string;
        updated_at: string;
        user_id: number;
    }

    interface ICreateArticle {
        author: string;
        body_html: string;
        handle?: string;
        image?: IBase64Image;
        metafields?: ICreateObjectMetafield[];
        published?: boolean;
        published_at?: string;
        summary_html?: string | null;
        tags?: string;
        template_suffix?: string | null;
        title: string;
        user_id?: number;
    }

    interface IUpdateArticle {
        author: string;
        body_html: string;
        handle?: string;
        image?: IBase64Image;
        metafields?: ICreateObjectMetafield[];
        published?: boolean;
        published_at?: string;
        summary_html?: string | null;
        tags?: string;
        template_suffix?: string | null;
        title: string;
        user_id?: number;
    }

    interface IImage {
        created_at: string;
        height: number;
        src: string;
        updated_at?: string;
        width: number;
        alt: string | null;
    }

    interface IBase64Image {
        attachment: string;
    }

    interface IObjectMetafield {
        key: string;
        namespace: string;
        value: string | number;
        value_type: "string" | "integer";
        description: string | null;
    }

    interface ICreateObjectMetafield {
        key: string;
        namespace: string;
        value: string | number;
        value_type: "string" | "integer";
        description?: string | null;
    }

    interface IAsset {
        attachment?: string;
        content_type: string;
        created_at: string;
        key: string;
        public_url: string;
        size: number;
        source_key: string;
        src: string;
        theme_id: number;
        updated_at: string;
        value?: string;
    }

    interface IUpdateAsset {
        attachment?: string;
        key: string;
        source_key?: string;
        src?: string;
        value?: string;
    }

    interface IBlog {
        commentable: "moderate" | "no" | "yes";
        created_at: string;
        feedburner: string | null;
        feedburner_location: string | null;
        handle: string;
        id: number;
        metafield: IObjectMetafield[];
        tags: string;
        template_suffix: string | null;
        title: string;
        updated_at: string;
    }

    interface ICreateBlog {
        commentable?: "moderate" | "no" | "yes";
        feedburner?: string | null;
        feedburner_location?: string | null;
        handle?: string;
        metafield?: ICreateObjectMetafield[];
        tags?: string;
        template_suffix?: string | null;
        title: string;
    }

    interface ICarrierService {
        active: boolean;
        callback_url: string;
        carrier_service_type: string; // I think this could be restricted to "api" or "legacy"
        name: string;
        service_discovery: boolean;
        format: "json" | "xml";
    }

    interface ICreateCarrierService {
        active?: boolean;
        callback_url: string;
        carrier_service_type?: string;
        name: string;
        service_discovery: boolean;
        format?: "json" | "xml";
    }

    interface IUpdateCarrierService {
        active?: boolean;
        callback_url?: string;
        carrier_service_type?: string;
        name?: string;
        service_discovery?: boolean;
        format?: "json" | "xml";
    }

    interface ICheckoutDiscount {
        amount: string;
        applicable: boolean;
        description: string;
        non_applicable_reason: string;
        title: string;
        value: string;
        value_type: "fixed_amount" | "percentage";
    }

    interface ICheckoutGiftCard {
        amount_used: string;
        balance: string;
        id: string;
        last_characters: string;
    }


    interface ICheckoutShippingRateCheckout {
        subtotal_price: string;
        total_price: string;
        total_tax: string;
    }

    interface ICheckoutShippingRate {
        checkout: ICheckoutShippingRateCheckout;
        delivery_range: string[];
        handle: string;
        price: string;
        requires_phone: boolean;
        title: string;
    }

    interface ICheckoutOrder {
        id: number;
        name: string;
        status_url: string;
    }

    interface ICheckoutRequestDetails {
        accept_language: string;
        ip_address: string;
        user_agent: string;
    }

    interface ICollect {
        collection_id: number;
        created_at: string;
        featured: boolean;
        id: number;
        position: number;
        product_id: number;
        sort_value: string;
        updated_at: string;
    }

    interface ICreateCollect {
        collection_id: number;
        featured?: boolean;
        position?: number;
        product_id: number;
        sort_value?: string;
    }

    type CollectionListingSortOrder = "alpha-asc" | "alpha-desc" | "best-selling" | "created" | "created-desc" | "manual" | "price-asc" | "price-desc";

    interface ICollectionListingImage extends IImage {
        position: number;
        product_it: number;
        variant_ids: number[];
    }

    interface ICollectionListing {
        collection_id: string;
        body_html: string;
        default_product_image: ICollectionListingImage;
        image: IImage;
        handle: string;
        published_at: string;
        title: string;
        sort_order: CollectionListingSortOrder;
        updated_at: string;
    }

    type CommentStatus = "published" | "removed" | "spam" | "unapproved";

    interface IComment {
        article_id: number;
        author: string;
        blog_id: number;
        body: string;
        body_html: string;
        created_at: string;
        email: string;
        id: number;
        ip: string;
        published_at: string;
        status: CommentStatus;
        updated_at: string;
        user_agent: string;
    }

    interface ICreateComment {
        article_id?: number;
        author: string;
        blog_id?: number;
        body?: string;
        body_html?: string;
        email: string;
        ip?: string;
        published_at?: string;
        status?: CommentStatus;
        user_agent?: string;
    }

    interface IUpdateComment {
        article_id?: number;
        author?: string;
        blog_id?: number;
        body?: string;
        body_html?: string;
        email?: string;
        ip?: string;
        published_at?: string;
        status?: CommentStatus;
        user_agent?: string;
    }

    interface ICountry {
        code: string;
        id: number;
        name: string;
        provinces: IProvince[];
        tax: number;
        tax_name: string
    }

    interface ICreateCountry {
        code: string;
        name?: string;
        tax?: number;
        tax_name?: string
    }

    interface IUpdateCountry {
        code?: string;
        name?: string;
        tax?: number;
        tax_name?: string
    }

    type CustomerCollectionSortOrder = "alpha-asc" | "alpha-desc" | "best-selling" | "created" | "created-desc" | "manual" | "price-asc" | "price-desc";

    interface ICustomCollection {
        body_html: string | null;
        handle: string;
        image: IImage;
        id: number;
        metafield?: IObjectMetafield; // From https://help.shopify.com/api/reference/customcollection but not visible in test API call
        published?: string; // From https://help.shopify.com/api/reference/customcollection but not visible in test API call
        published_at: string;
        published_scope: string;
        sort_order: CustomerCollectionSortOrder;
        template_suffix: string | null;
        title: string;
        updated_at: string;
    }

    type CustomerState = "declined" | "disabled" | "enabled" | "invited";

    interface ICustomer {
        accepts_marketing: boolean;
        addresses?: ICustomerAddress[];
        created_at: string;
        default_address: string;
        email: string;
        first_name: string;
        id: number;
        last_name: string;
        metafield?: IObjectMetafield; // From https://help.shopify.com/api/reference/customer but not visible in test API call
        phone: string;
        multipass_identifier: null;
        last_order_id: number | null;
        last_order_name: string | null;
        note: string | null;
        orders_count: number;
        state: CustomerState;
        tags: string;
        tax_exempt: boolean;
        total_spent: string;
        updated_at: string;
        verified_email: boolean;
    }

    interface ICustomerAddress {
        address1: string;
        address2?: string;
        city: string;
        company: string | null;
        country: string;
        country_code: string;
        customer_id: number;
        first_name: string;
        id: number
        last_name: string;
        latitude: string;
        longitude: string;
        name: string;
        phone: string | null;
        province: string;
        province_code: string;
        zip: string;
    }

    interface ICustomerSavedSearch {
        created_at: string;
        id: number;
        name: string;
        query: string;
        updated_at: string;
    }

    interface IDiscountCode {
        created_at: string;
        id: number;
        code: string;
        price_rule_id: number;
        updated_at: string;
        usage_count: number;
    }

    interface IDraftOrderNoteAttribute {
        name: string;
        value: string;
    }

    type DraftOrderDiscountValueType = "fixed_amount" | "percentage";

    interface IDraftOrderDiscount {
        amount: string;
        description: string;
        non_applicable_reason: string;
        title: string;
        value: string;
        value_type: DraftOrderDiscountValueType;
    }

    type DraftOrderLineItemFulfullmentService = "api" | "custom" | "legacy" | "manual";
    type DraftOrderLineItemFulfullmentStatus = "fulfilled" | "partial";

    interface IDraftOrderLineItem {
        applied_discounts: any[] | null;
        discount_codes: any[];
        fulfillment_service: DraftOrderLineItemFulfullmentService;
        fulfillment_status?: DraftOrderLineItemFulfullmentStatus | null;
        gift_card: boolean;
        grams: number;
        key: string;
        line_price: string;
        name: string;
        origin_location_id: number;
        price: string;
        product_id: number;
        properties: any | null;
        quantity: number;
        requires_shipping: boolean;
        sku: string;
        taxable: boolean;
        tax_lines: ICheckoutTaxLine[];
        title: string;
        variant_id: number;
        variant_title: string;
        vendor: string;
    }

    interface IDraftOrder {
        applied_discount: IDraftOrderDiscount[];
        billing_address: ICustomerAddress;
        completed_at: string | null;
        created_at: string;
        currency: string;
        customer: string;
        email: string;
        id: number;
        invoice_sent_at: string | null;
        invoice_url: string;
        line_items: IDraftOrderLineItem[];
        name: string;
        note: string;
        note_attributes: IDraftOrderNoteAttribute[];
        order_id: number | null;
        shipping_address: ICustomerAddress;
        shipping_line: string;
        subtotal_price: string;
        tags: string;
        tax_exempt: boolean;
        tax_lines: string;
        taxes_included: boolean;
        total_tax: string;
        total_price: string;
        updated_at: string;
    }

    interface IEvent {
        arguments: any[];
        author: string;
        body: string | null;
        created_at: string;
        id: number;
        description: string;
        path: string;
        message: string;
        subject_id: number;
        subject_type: "Article" | "Blog" | "Collection" | "Comment" | "Order" | "Page" | "Product" | "ApiPermission";
        verb: string;
    }

    type IFulfillmentStatus = "cancelled" | "error" | "failure" | "open" | "pending" | "success";

    interface IFulfillmentReceipt {
        textcase: boolean;
        authorization: string;
    }

    interface IFulfilmentLineItemProperty {
        name: string;
        value: string;
    }

    interface IFulfillmentLineItemTaxLine {
        title: string;
        price: string;
        rate: number;
    }

    interface IFulfilmentLineItem {
        id: number;
        variant_id: number;
        title: string;
        quantity: number;
        price: string;
        grams: number;
        sku: string;
        variant_title: string;
        vendor: any | null;
        fulfillment_service: string;
        product_id: number;
        requires_shipping: boolean;
        taxable: boolean;
        gift_card: boolean;
        name: string;
        variant_inventory_management: string;
        properties: IFulfilmentLineItemProperty[];
        product_exists: boolean;
        fulfillable_quantity: number;
        total_discount: string;
        fulfillment_status: IFulfillmentStatus;
        tax_lines: IFulfillmentLineItemTaxLine[];
    }

    interface IFulfillment {
        created_at: string;
        id: number;
        line_items: IFulfilmentLineItem[];
        notify_customer: string;
        order_id: number;
        receipt: IFulfillmentReceipt;
        service: string;
        shipment_status: string | null;
        status: IFulfillmentStatus;
        tracking_company: string;
        tracking_numbers: string[];
        tracking_url: string;
        tracking_urls: string[];
        updated_at: string;
        variant_inventory_management: string;
    }

    type FulfillmentEventStatus = "confirmed" | "delivered" | "failure" | "in_transit" | "out_for_delivery";

    interface IFulfillmentEvent {
        address1: string | null;
        city: string | null;
        country: string | null;
        created_at: string;
        estimated_delivery_at: string | null;
        fulfillment_id: number;
        id: number;
        happened_at: string;
        latitude: string | null;
        longitude: string;
        message: string | null;
        order_id: string;
        province: string | null;
        shop_id: number;
        status: FulfillmentEventStatus;
        updated_at: string;
        zip: string | null;
    }

    interface IFulfillmentService {
        callback_url: string;
        format: "json";
        handle: string;
        inventory_management: boolean;
        name: string;
        provider_id: number | null;
        requires_shipping_method: boolean;
        tracking_support: boolean;
    }

    interface IGiftCard {
        id: number;
        api_client_id: number;
        user_id: number;
        order_id: number;
        customer_id: number;
        line_item_id: number;
        balance: string;
        currency: string;
        code: string;
        last_characters: string;
        note: string;
        template_suffix: string;
        created_at: string;
        updated_at: string;
        disabled_at: string;
        expires_on: string;
    }

    interface IInventoryItem {
      id: number;
      sku: string;
      tracked: boolean;
      created_at: string;
      updated_at: string;
    }

    interface IInventoryLevel {
      inventory_item_id: number;
      location_id: number;
      available: number | null;
      updated_at: string;
    }

    interface ILocation {
        id: number;
        address1: string;
        address2: string | null;
        city: string;
        country: string;
        country_code: string;
        country_name: string;
        created_at: string;
        deleted_at: string;
        name: string;
        phone: string;
        province: string;
        province_code: string;
        updated_at: string;
        zip: string;
    }

    interface IMarketingEventMarketedResources {
        id: number;
        type: "product" | "collection" | "price_rule" | "discount" | "page" | "article" | "shop";
    }

    type MarketingEventEventType = "ad" | "post" | "message" | "retargeting" | "sem" | "transactional" | "affiliate" | "loyalty" | "newsletter" | "abandoned_cart" | "receipt";
    type MarketingEventMarketingChannel = "search" | "display" | "social" | "email" | "referral";
    type MarketingEventBudgetType = "daily" | "lifetime";

    interface IMarketingEvent {
        breadcrumb_id: any | null;
        budget: string;
        budget_type: MarketingEventBudgetType;
        currency: string;
        description: string | null;
        ended_at: string | null;
        event_target: string;
        event_type: MarketingEventEventType;
        id: number;
        manage_url: string;
        marketed_resources: IMarketingEventMarketedResources[];
        marketing_channel: MarketingEventMarketingChannel;
        paid: boolean;
        preview_url: string;
        referring_domain: string;
        remote_id: string;
        scheduled_to_end_at: string | null;
        started_at: string;
        utm_campaign: string;
        utm_medium: string;
        utm_source: string;
    }

    type MetaFieldValueType = "string" | "integer";

    interface IMetafield {
        created_at: string;
        description: string | null;
        id: number;
        key: string;
        namespace: string;
        owner_id: number;
        owner_resource: string;
        value: string | number;
        value_type: MetaFieldValueType;
        updated_at: string;
    }

    type OrderCancelReason = "customer" | "declined" | "fraud" | "inventory" | "other";

    interface IOrderClientDetails {
        accept_language: string | null;
        browser_height: number | null;
        browser_ip: string | null;
        browser_width: number | null;
        session_has: string | null;
        user_agent: string | null;
    }

    interface IOrderCustomer {
        accepts_marketing: boolean;
        created_at: string;
        email: string;
        first_name: string;
        id: number;
        last_name: string;
        phone: string;
        multipass_identifier: null;
        last_order_id: number | null;
        last_order_name: string | null;
        note: string | null;
        orders_count: number;
        state: CustomerState;
        tags: string;
        total_spent: string;
        updated_at: string;
    }

    type OrderDiscountCodeType = "fixed_amount" | "percentage" | "shipping";
    type OrderFinancialStatus = "authorized" | "paid" | "partially_paid" | "partially_refunded" | "pending" | "voided";
    type OrderFulfillmentStatus = "fulfilled" | "partial" | null;
    type OrderProcessingMethod = "checkout" | "direct" | "express" | "manual" | "offsite";

    interface IOrderDiscountCode {
        amount: number;
        code: string;
        type: OrderDiscountCodeType
    }

    interface IOrderFulfillment {
        created_at: string;
        id: number;
        line_items: any;
        order_id: number;
        receipt: string;
        order_status: any;
        tracking_company: string;
        tracking_number: string;
        updated_at: string;
    }

    interface IOrderLineItemProperty {
        name: string;
        value: string;
    }

    interface IOrderTaxLine {
        title: string;
        price: string;
        rate: number;
    }

    interface IOrderLineItemNote {
        name: string;
        value: string;
    }

    interface IOrderLineItem {
        fulfillable_quantity: number;
        fulfillment_service: string;
        fulfillment_status: OrderFulfillmentStatus;
        grams: number;
        id: number;
        price: string;
        product_id: number;
        quantity: number;
        requires_shipping: boolean;
        sku: string;
        title: string;
        variant_id: number;
        variant_title: string;
        vendor: string;
        name: string;
        gift_card: boolean;
        properties: IOrderLineItemProperty[];
        taxable: boolean;
        tax_lines: IOrderTaxLine;
        total_discount: string;
    }

    interface IOrderShippingLineTaxLine {
        title: string;
        price: string;
        rate: number;
    }

    interface IOrderShippingLine {
        code: string;
        price: number;
        source: string;
        title: string;
        tax_lines: IOrderShippingLineTaxLine[];
        carrier_identifier: string | null;
        requested_fulfillment_service_id: string | null;
    }

    interface IOrder {
        app_id: number;
        billing_address: ICustomerAddress;
        browser_ip: string | null;
        buyer_accepts_marketing: boolean;
        cancel_reason: OrderCancelReason;
        cancelled_at: string | null;
        cart_token: string;
        client_details: IOrderClientDetails;
        closed_at: string | null;
        created_at: string;
        currency: string;
        customer: IOrderCustomer;
        customer_locale: string;
        discount_codes: IOrderDiscountCode[];
        email: string;
        financial_status: OrderFinancialStatus;
        fulfillments: IOrderFulfillment[];
        fulfillment_status: OrderFulfillmentStatus;
        tags: string;
        gateway: string;
        id: number;
        landing_site: string;
        line_items: IOrderLineItem[];
        location_id: number;
        name: string;
        note: string | null;
        note_attributes: IOrderLineItemNote[];
        number: number;
        order_number: number;
        payment_details: any;
        payment_gateway_names: string[];
        phone: string;
        processed_at: string;
        processing_method: OrderProcessingMethod;
        referring_site: string;
        shipping_address: ICustomerAddress;
        shipping_lines: IOrderShippingLine[];
        subtotal_price: string;
        total_discounts: string;
        total_line_items_price: string;
        total_price: string;
        total_tax: string;
        total_tip_received: string;
        total_weight: number;
        token: string;
        user_id: number | null;
        updated_at: string;
        order_status_url: string;
        refunds: IRefund[];
    }

    type OrderRisksRecommendation = "accept" | "cancel" | "cancel";

    interface IOrderRisk {
        cause_cancel: boolean;
        checkout_id: number | null;
        display: boolean;
        id: number;
        order_id: number;
        message: string;
        recommendation: OrderRisksRecommendation;
        score: number;
        source: string;
    }

    interface IPage {
        author: string;
        body_html: string;
        created_at: string;
        handle: string;
        id: number;
        metafield: IObjectMetafield[];
        published_at: string;
        shop_id: number;
        template_suffix: string | null;
        title: string;
        updated_at: string;
    }

    interface IPolicy {
        title: string;
        body: string;
        url: string;
        created_at: string;
        updated_at: string;
    }

    interface IPriceRulePrerequisiteSubtotalRange {
        prerequisite_subtotal_range: string;
    }

    type PriceRuleTargetType = "line_item" | "shipping_line";
    type PriceRuleTargetSelection = "all" | "entitled";
    type PriceRuleAllocationMethod = "each" | "across";
    type PriceRuleValueType = "fixed_amount" | "percentage";
    type PriceRuleCustomerSelection = "all" | "prerequisite";

    interface IPriceRule {
        created_at: string;
        id: number;
        title: string;
        target_type: PriceRuleTargetType;
        target_selection: PriceRuleTargetSelection;
        allocation_method: PriceRuleAllocationMethod;
        value_type: PriceRuleValueType;
        value: string;
        once_per_customer: boolean;
        usage_limit: number | null;
        customer_selection: PriceRuleCustomerSelection;
        prerequisite_saved_search_ids: number[];
        prerequisite_subtotal_range: IPriceRulePrerequisiteSubtotalRange | null;
        prerequisite_shipping_price_range: string;
        entitled_product_ids: number[];
        entitled_variant_ids: number[];
        entitled_collection_ids: number[];
        entitled_country_ids: number[];
        starts_at: string;
        ends_at: string;
    }

    interface IProductOption {
        id: number;
        name: string;
        position: number;
        product_id: number;
        values: string[];
    }

    interface IProduct {
        body_html: string;
        created_at: string;
        handle: string;
        id: number;
        image: IProductImage;
        images: IProductImage[];
        options: IProductOption[];
        product_type: string;
        published_at: string;
        published_scope: string;
        tags: string;
        template_suffix: string | null;
        title: string;
        metafields_global_title_tag?: string;
        metafields_global_description_tag?: string;
        updated_at: string;
        variants: IProductVariant[];
    }

    interface IProductImage {
        created_at: string;
        id: number;
        position: number;
        product_id: number;
        variant_ids: number[];
        src: string;
        width: number;
        height: number;
        updated_at: string;
        alt: string | null;
    }

    type ProductVariantInventoryPolicy = "deny" | "continue";
    type ProductVariantWeightUnit = "g" | "kg" | "oz" | "lb";

    interface IProductVariant {
        barcode: string;
        compare_at_price: string;
        created_at: string;
        fulfillment_service: string;
        grams: number;
        id: number;
        image_id: number | null;
        inventory_item_id: number;
        inventory_management: string;
        inventory_policy: ProductVariantInventoryPolicy;
        inventory_quantity: number;
        old_inventory_quantity: number;
        option1: string | null;
        option2: string | null;
        option3: string | null;
        position: number;
        price: string;
        product_id: number;
        requires_shipping: boolean;
        sku: string;
        taxable: boolean;
        title: string;
        updated_at: string;
        weight: number;
        weight_unit: ProductVariantWeightUnit;
    }

    interface IProductVariantOption {
        option_id: number;
        name: string;
        value: string;
    }

    interface IProductListingVariant extends IProductVariant {
        available: boolean;
        option_values: IProductVariantOption[];
    }

    interface IProductListing {
        product_id: number;
        body_html: string;
        created_at: string;
        handle: string;
        images: IProductImage[];
        options: IProductOption[];
        product_type: string;
        published_at: string;
        tags: string;
        title: string;
        updated_at: string;
        variants: IProductListingVariant[];
    }

    interface IProvince {
        code: string;
        country_id: number;
        id: number;
        name: string;
        shipping_zone_id: NumberConstructor;
        tax: number;
        tax_name: string;
        tax_type: string | null;
        tax_percentage: number;
    }

    type RecurringApplicationChargeStatus =
        "accepted" |
        "active" |
        "cancelled" |
        "declined" |
        "expired" |
        "frozen" |
        "pending";

    interface IRecurringApplicationCharge {
        activated_on: string | null;
        billing_on: string | null;
        cancelled_on: string | null;
        capped_amount: number;
        confirmation_url: string;
        created_at: string;
        id: number;
        name: string;
        price: string;
        return_url: string;
        status: RecurringApplicationChargeStatus;
        terms: string;
        test: true | null;
        trial_days: number;
        trial_ends_on: string;
        updated_at: string;
    }

    interface ICreateRecurringApplicationCharge {
        capped_amount?: number;
        name: string;
        price: number;
        return_url: string;
        terms?: string;
        test?: true;
        trial_days?: number;
        trial_ends_on?: string;
    }

    interface IRedirect {
        id: string;
        path: string;
        target: string;
    }

    interface ICreateRedirect {
        path: string;
        target: string;
    }

    interface IUpdateRedirect {
        path?: string;
        target?: string;
    }

    interface IRefundLineItem {
        id: number;
        line_item: any;
        lint_item_id: number;
        quantity: 2;
    }

    interface IRefund {
        created_at: string;
        processed_at: string;
        id: number;
        note: string;
        refund_line_items: IRefundLineItem[];
        restock: string;
        transactions: string;
        user_id: string;
    }

    interface IReport {
        category: string;
        id: number;
        name: string;
        shopify_ql: string;
        updated_at: string;
    }

    type ResourceFeedbackState = "requires_action" | "success";

    interface IResourceFeedback {
        shop_id: number;
        created_at: string;
        updated_at: string;
        resource_id: number;
        resource_type: string;
        state: ResourceFeedbackState;
        messages: string[];
        feedback_generated_at: string;
    }

    type ScriptTagDisplayScope = "online_store" | "order_status" | "all";
    type ScriptTagEvent = "onload";

    interface IScriptTag {
        created_at: string;
        event: ScriptTagEvent;
        id: number;
        src: string;
        display_scope: ScriptTagDisplayScope;
        updated_at: string;
    }

    interface ICreateScriptTag {
        event: ScriptTagEvent;
        src: string;
        display_scope?: ScriptTagDisplayScope;
    }

    interface IUpdateScriptTag {
        event: ScriptTagEvent;
        src: string;
        display_scope?: ScriptTagDisplayScope;
    }

    interface ICarrierShippingRateProvider {
        carrier_service_id: number;
        flat_rate_modified: string;
        id: number;
        percentage_modified: number;
        service_filter: any;
        shipping_zone_id: number;
    }

    interface IPriceBasedShippingRate {
        id: number;
        max_order_subtotal: string | null;
        min_order_subtotal: string | null;
        name: string;
        price: string;
        shipping_zone_id: number;
    }

    interface IWeightBasedShippingRate {
        id: number;
        name: string;
        price: string;
        shipping_zone_id: number
        weight_height: number;
        weight_low: number;
    }

    interface IShippingZoneCountry {
        code: string;
        country_id: number;
        id: number;
        name: string;
        tax: number;
        tax_name: string;
        tax_percentage: number;
        tax_type: any | null;
        shipping_zone_id: number;
    }

    interface IShippingZone {
        id: number;
        name: string;
        countries: IShippingZoneCountry[];
        carrier_shipping_rate_providers: ICarrierShippingRateProvider[];
        price_based_shipping_rates: IPriceBasedShippingRate[];
        weight_based_shipping_rates: IWeightBasedShippingRate[];
    }

    interface IShop {
        address1: string;
        address2: string;
        city: string;
        country: string;
        country_code: string;
        country_name: string;
        created_at: string;
        county_taxes: string;
        customer_email: string | null;
        currency: string;
        domain: string;
        eligible_for_card_reader_giveaway: boolean;
        eligible_for_payments: boolean;
        email: string;
        finances: boolean;
        force_ssl: boolean;
        google_apps_domain: string | null;
        google_apps_login_enabled: any | null;
        has_discounts: boolean;
        has_gift_cards: boolean;
        has_storefront: boolean;
        iana_timezone: string;
        id: number;
        latitude: number;
        longitude: number;
        money_format: string;
        money_in_emails_format: string;
        money_with_currency_format: string;
        money_with_currency_in_emails_format: string;
        myshopify_domain: string;
        name: string;
        password_enabled: boolean;
        phone: string | null;
        plan_display_name: string;
        plan_name: string;
        primary_locale: string;
        primary_location_id: number;
        province: string;
        province_code: string;
        requires_extra_payments_agreement: boolean;
        setup_required: boolean;
        shop_owner: string;
        source: string | null;
        tax_shipping: boolean | null;
        taxes_included: true | null;
        timezone: string;
        updated_at: string;
        weight_unit: string;
        zip: string;
    }

    export type SmartCollectionRuleTextColumn = "title" | "tag" | "type" | "variant_title" | "vendor";
    export type SmartCollectionRuleTextRelation = "contains" | "equals" | "ends_with" | "not_contains" | "not_equals" | "starts_with";
    export type SmartCollectionRuleNumberColumn = "variant_compare_at_price" | "variant_inventory" | "variant_price" | "variant_weight";
    export type TSmartCollectionRuleNumberRelation = "equals" | "greater_than" | "less_than" | "not_equals";

    interface ISmartCollectionRule {
        column: SmartCollectionRuleTextColumn | SmartCollectionRuleNumberColumn;
        relation: SmartCollectionRuleTextRelation | TSmartCollectionRuleNumberRelation;
        condition: string;
    }

    type SmartCollectionSortOrder =
        "alpha-asc" |
        "alpha-desc" |
        "best-selling" |
        "created" |
        "created-desc" |
        "manual" |
        "price-asc" |
        "price-desc";

    interface ISmartCollection {
        body_html: string;
        disjunctive: boolean;
        handle: string;
        id: number;
        image?: IImage;
        published_at: string;
        published_scope: string;
        rules: ISmartCollectionRule[];
        sort_order: SmartCollectionSortOrder;
        template_suffix: string | null;
        title: string;
        updated_at: string;
    }

    interface IStorefrontAccessToken {
        id: string;
        access_token: string;
        access_scope: string;
        created_at: string;
        title: string;
    }

    type ThemeRole = "main" | "unpublished";

    interface ITheme {
        created_at: string;
        id: number;
        name: string;
        previewable: boolean;
        processing: boolean;
        role: ThemeRole;
        theme_store_id: number;
        updated_at: string;
    }

    type TransactionErrorCode =
        "call_issuer" |
        "card_declined" |
        "expired_card" |
        "incorrect_address" |
        "incorrect_cvc" |
        "incorrect_number" |
        "incorrect_zip" |
        "invalid_cvc" |
        "invalid_expiry_date" |
        "invalid_number" |
        "pick_up_card" |
        "processing_error";
    type TransactionKind = "authorization" | "capture" | "refund" | "sale" | "void";
    type TransactionSourceName = "android" | "iphone" | "pos" | "web";
    type TransactionStatus = "error" | "failure" | "pending" | "success";

    interface ITransactionPaymentDetails {
        avs_result_code: string | null;
        credit_card_bin: string | null;
        credit_card_company: string;
        create_card_number: string;
        cvv_result_code: string | null;
    }

    interface ITRansactionReceipt {
        testcase: boolean;
        authorization: string;
    }

    interface ITransaction {
        amount: string;
        authorization: string;
        created_at: string;
        device_id: string;
        gateway: string;
        source_name: TransactionSourceName;
        payment_details: ITransactionPaymentDetails;
        id: number;
        kind: TransactionKind;
        order_id: number;
        receipt: ITRansactionReceipt;
        error_code: TransactionErrorCode;
        status: TransactionStatus;
        test: boolean;
        user_id: number;
        currency: string;
    }

    interface IUsageCharge {
        balance_remaining: number;
        balance_used: number;
        billing_on: string;
        created_at: string;
        description: string;
        id: number;
        price: string;
        risk_level: number
        recurring_application_charge_id: number;
        updated_at: string;
    }

    interface ICreateUsageCharge {
        description: string;
        price: number;
    }

    type UserPermissions =
        "applications" |
        "customers" |
        "dashboard" |
        "full" |
        "gift_cards" |
        "links" |
        "marketing" |
        "order" |
        "pages" |
        "preferences" |
        "products" |
        "reports" |
        "themes";

    type UserType = "regular" | "restricted";

    interface IUser {
        account_owner: boolean;
        bio: string;
        email: string;
        first_name: string;
        id: number;
        im: string;
        last_name: string;
        permissions: UserPermissions[];
        phone: string;
        pin: string;
        receive_announcements: number;
        screen_name: string;
        url: string;
        user_type: UserType;
    }

    export type WebhookTopic =
        "app/uninstalled" |
        "carts/create" |
        "carts/update" |
        "checkouts/create" |
        "checkouts/delete" |
        "checkouts/update" |
        "collection_listings/add" |
        "collection_listings/remove" |
        "collection_listings/update" |
        "collections/create" |
        "collections/delete" |
        "collections/update" |
        "customer_groups/create" |
        "customer_groups/delete" |
        "customer_groups/update" |
        "customers/create" |
        "customers/delete" |
        "customers/disable" |
        "customers/enable" |
        "customers/update" |
        "draft_orders/create" |
        "draft_orders/delete" |
        "draft_orders/update" |
        "fulfillment_events/create" |
        "fulfillment_events/delete" |
        "fulfillments/create" |
        "fulfillments/update" |
        "inventory_items/create" |
        "inventory_items/update" |
        "inventory_items/delete" |
        "inventory_levels/connect" |
        "inventory_levels/update" |
        "inventory_levels/disconnect" |
        "locations/create" |
        "locations/update" |
        "locations/delete" |
        "order_transactions/create" |
        "orders/cancelled" |
        "orders/create" |
        "orders/delete" |
        "orders/fulfilled" |
        "orders/paid" |
        "orders/partially_fulfilled" |
        "orders/updated" |
        "product_listings/add" |
        "product_listings/remove" |
        "product_listings/update" |
        "products/create" |
        "products/delete" |
        "products/update" |
        "refunds/create" |
        "shop/update" |
        "themes/create" |
        "themes/delete" |
        "themes/publish" |
        "themes/update";

    type WebhookFormat = "json" | "xml";

    export interface IWebhook {
        address: string;
        created_at: string;
        fields: string[];
        format: WebhookFormat;
        id: number;
        metafield_namespaces: string[];
        topic: WebhookTopic;
        updated_at: string;
    }

    export interface ICreateWebhook {
        address: string;
        fields?: string[];
        format?: WebhookFormat;
        metafield_namespaces?: string[];
        topic: WebhookTopic;
    }

    export interface IUpdateWebhook {
        address: string;
        fields?: string[];
        format?: WebhookFormat;
        metafield_namespaces?: string[];
        topic: WebhookTopic;
    }
}
