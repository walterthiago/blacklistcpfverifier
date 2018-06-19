const assert = require('assert');
const sinon = require('sinon');

const RequestMock = require('../utils/request-mock');
const ResponseMock = require('../utils/response-mock');

const healthController = require('../../controllers/health.controller');
const blacklistService = require('../../services/blacklist.service');


describe('health.controller', () => {

  describe('#health()', () => {

    it('should test heatlh controller with blacklist without element', () => {

      const stub = sinon.stub();
      stub(blacklistService, 'retrieveBlacklist');
      blacklistService.retrieveBlacklist = () => {
        return Promise.resolve([])
      };

      const req = new RequestMock();
      const res = new ResponseMock();

      return healthController.health(req, res).then(() => {

        assert.equal(res.statusCode, 200);

        assert.equal(res.body.uptime > 0, true);
        assert.equal(res.body.queries, 0);
        assert.equal(res.body.blacklistSize, 0);

        stub.resetBehavior();

      }).catch(error => assert.fail(error));

    });

  });
});