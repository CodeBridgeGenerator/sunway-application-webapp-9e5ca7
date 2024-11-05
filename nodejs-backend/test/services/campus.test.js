const assert = require('assert');
const app = require('../../src/app');

describe('\'campus\' service', () => {
  it('registered the service', () => {
    const service = app.service('campus');

    assert.ok(service, 'Registered the service (campus)');
  });
});
