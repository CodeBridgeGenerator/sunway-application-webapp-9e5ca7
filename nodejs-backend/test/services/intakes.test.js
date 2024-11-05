const assert = require('assert');
const app = require('../../src/app');

describe('\'intakes\' service', () => {
  it('registered the service', () => {
    const service = app.service('intakes');

    assert.ok(service, 'Registered the service (intakes)');
  });
});
