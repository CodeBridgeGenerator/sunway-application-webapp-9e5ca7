const assert = require('assert');
const app = require('../../src/app');

describe('\'contactInformation\' service', () => {
  it('registered the service', () => {
    const service = app.service('contactInformation');

    assert.ok(service, 'Registered the service (contactInformation)');
  });
});
