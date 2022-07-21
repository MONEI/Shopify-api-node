describe('Shopify#disputeFileUpload', () => {
  'use strict';

  const expect = require('chai').expect;

  const fixtures = require('./fixtures/dispute-file-upload');
  const common = require('./common');

  const shopify = common.shopify;
  const scope = common.scope;

  afterEach(() => expect(scope.pendingMocks()).to.deep.equal([]));

  it('uploads a file to a dispute', () => {
    const input = fixtures.req.create;
    const output = fixtures.res.create;

    scope
      .post(
        '/admin/shopify_payments/disputes/598735659/dispute_file_uploads.json',
        input
      )
      .reply(200, output);

    return shopify.disputeFileUpload
      .create(598735659, input.dispute_file_upload)
      .then((data) => expect(data).to.deep.equal(output.dispute_file_upload));
  });

  it('deletes a dispute evidence file', () => {
    const pathname =
      '/admin/shopify_payments' +
      '/disputes/598735659/dispute_file_uploads/799719586.json';

    scope.delete(pathname).reply(200);

    return shopify.disputeFileUpload
      .delete(598735659, 799719586)
      .then((data) => expect(data).to.deep.equal({}));
  });
});
