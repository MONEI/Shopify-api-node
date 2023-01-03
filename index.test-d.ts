import { expectType } from 'tsd';
import Shopify from '.';

// can be constructed with public access token
new Shopify({
  shopName: 'my-shopify-store.myshopify.com',
  accessToken: '111'
});

// can be constructed with public access token and version
const client = new Shopify({
  shopName: 'my-shopify-store.myshopify.com',
  accessToken: '111',
  apiVersion: '2020-01'
});

// can be constructed with got hooks
new Shopify({
  shopName: 'my-shopify-store.myshopify.com',
  accessToken: '111',
  hooks: {
    beforeRequest: [
      (options) => {
        options.headers['X-Test'] = 'test';
      }
    ]
  }
});

expectType<number>(client.callLimits.remaining);
expectType<number>(client.callLimits.current);
expectType<number>(client.callLimits.max);

const shop = await client.shop.get();
expectType<number>(shop.id);
expectType<string>(shop.myshopify_domain);

const product = await client.product.get(10);
expectType<number>(product.id);
expectType<string>(product.title);

const result = await client.graphql(`query { shop { id myshopify_domain } }`);
expectType<any>(result);
