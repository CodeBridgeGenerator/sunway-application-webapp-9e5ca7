const assert = require('assert');
const app = require('../../src/app');

describe('\'programmelevel\' service', () => {
  it('registered the service', () => {
    const service = app.service('programmelevel');

    assert.ok(service, 'Registered the service (programmelevel)');
  });
});
