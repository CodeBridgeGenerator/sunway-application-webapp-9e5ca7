const assert = require('assert');
const app = require('../../src/app');

describe('\'termsandconditions\' service', () => {
  it('registered the service', () => {
    const service = app.service('termsandconditions');

    assert.ok(service, 'Registered the service (termsandconditions)');
  });
});
