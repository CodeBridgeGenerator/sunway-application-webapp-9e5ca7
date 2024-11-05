const assert = require('assert');
const app = require('../../src/app');

describe('\'programme\' service', () => {
  it('registered the service', () => {
    const service = app.service('programme');

    assert.ok(service, 'Registered the service (programme)');
  });
});
