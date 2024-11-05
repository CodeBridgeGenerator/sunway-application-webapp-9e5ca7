const assert = require('assert');
const app = require('../../src/app');

describe('\'intake\' service', () => {
  it('registered the service', () => {
    const service = app.service('intake');

    assert.ok(service, 'Registered the service (intake)');
  });
});
