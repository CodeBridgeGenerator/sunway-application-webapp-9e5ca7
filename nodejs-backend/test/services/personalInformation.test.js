const assert = require('assert');
const app = require('../../src/app');

describe('\'personalInformation\' service', () => {
  it('registered the service', () => {
    const service = app.service('personalInformation');

    assert.ok(service, 'Registered the service (personalInformation)');
  });
});
