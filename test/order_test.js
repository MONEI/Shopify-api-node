var assert = require('assert')
  , should = require('should')
  , nock   = require('nock')
  , Order = require('../lib/resources/order.js')
  , test_shop = "https://hand-ratke-and-green2603.myshopify.com";

nock.recorder.rec();

var all = nock('test_shop')
  .get('/admin/orders.json')
  .reply(200, "{\"orders\":[{\"buyer_accepts_marketing\":true,\"cancel_reason\":null,\"cancelled_at\":null,\"cart_token\":\"5bdeee3db61177a5d70ea8557a9f813c\",\"closed_at\":null,\"created_at\":\"2012-04-03T23:33:43-04:00\",\"currency\":\"CAD\",\"email\":\"kenrick.beckett@gmail.com\",\"financial_status\":\"authorized\",\"fulfillment_status\":null,\"gateway\":\"bogus\",\"id\":128702683,\"landing_site\":\"/\",\"name\":\"#1004\",\"note\":\"\",\"number\":4,\"referring_site\":\"\",\"subtotal_price\":\"19.00\",\"taxes_included\":false,\"token\":\"965701922eec8c49ad010cd735119c8b\",\"total_discounts\":\"0.00\",\"total_line_items_price\":\"19.00\",\"total_price\":\"39.00\",\"total_tax\":\"0.00\",\"total_weight\":0,\"updated_at\":\"2012-04-03T23:34:33-04:00\",\"browser_ip\":\"67.230.51.180\",\"landing_site_ref\":null,\"order_number\":1004,\"discount_codes\":[],\"note_attributes\":[],\"line_items\":[{\"fulfillment_service\":\"manual\",\"fulfillment_status\":null,\"grams\":0,\"id\":209354987,\"price\":\"19.00\",\"product_id\":90130027,\"quantity\":1,\"requires_shipping\":true,\"sku\":\"\",\"title\":\"Balanced modular neural-net\",\"variant_id\":210979011,\"variant_title\":null,\"vendor\":\"Shopify\",\"name\":\"Balanced modular neural-net\"}],\"shipping_lines\":[{\"code\":\"International Shipping\",\"price\":\"20.00\",\"source\":\"shopify\",\"title\":\"International Shipping\"}],\"tax_lines\":[],\"payment_details\":{\"avs_result_code\":null,\"credit_card_bin\":\"1\",\"cvv_result_code\":null,\"credit_card_number\":\"XXXX-XXXX-XXXX-1\",\"credit_card_company\":\"Bogus\"},\"billing_address\":{\"address1\":\"19 Hudson Avenue,\",\"address2\":\"\",\"city\":\"Kingston\",\"company\":\"Tata\",\"country\":\"Jamaica\",\"first_name\":\"Kenrick\",\"last_name\":\"Beckett\",\"latitude\":\"17.99538\",\"longitude\":\"-76.79731\",\"phone\":\"18764735370\",\"province\":\"\",\"zip\":\"00000\",\"name\":\"Kenrick Beckett\",\"country_code\":\"JM\",\"province_code\":null},\"shipping_address\":{\"address1\":\"19 Hudson Avenue,\",\"address2\":\"\",\"city\":\"Kingston\",\"company\":\"Tata\",\"country\":\"Jamaica\",\"first_name\":\"Kenrick\",\"last_name\":\"Beckett\",\"latitude\":\"17.99538\",\"longitude\":\"-76.79731\",\"phone\":\"18764735370\",\"province\":\"\",\"zip\":\"00000\",\"name\":\"Kenrick Beckett\",\"country_code\":\"JM\",\"province_code\":null},\"fulfillments\":[],\"client_details\":{\"accept_language\":\"en-US,en;q=0.8\",\"browser_ip\":\"67.230.51.180\",\"session_hash\":\"890c465a409a45bec21bd9dfb7351f9ad5a7640c1e4284e6a37d4ff04a481db9\",\"user_agent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19\"},\"risk_details\":[],\"customer\":{\"accepts_marketing\":false,\"created_at\":\"2012-04-03T23:33:44-04:00\",\"email\":\"kenrick.beckett@gmail.com\",\"first_name\":\"Kenrick\",\"id\":90163405,\"last_name\":\"Beckett\",\"last_order_id\":null,\"note\":null,\"orders_count\":0,\"state\":\"disabled\",\"total_spent\":\"0.00\",\"updated_at\":\"2012-04-03T23:34:35-04:00\",\"tags\":\"\",\"last_order_name\":null}}]}", { server: 'nginx',
  	 status: '200 OK',
});


describe('Order', function() {
	var site = "https://20645a148dc9ce836849c53ed6598a7c:25afa84c5529c68416fe24ec2f6c0fd0@hand-ratke-and-green2603.myshopify.com/admin"; 
	var resource = new Order(site);

	it('should get all orders', function(done) {

		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
		  done();
		});

	});

});
