const assert = require('assert');
const app = require('../../src/app');

describe('\'programmeDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('programmeDetails');

    assert.ok(service, 'Registered the service (programmeDetails)');
  });
});
