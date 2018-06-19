const assert = require('assert');
const sinon = require('sinon');

const RequestMock = require('../utils/request-mock');
const ResponseMock = require('../utils/response-mock');

const queryController = require('../../controllers/query.controller');
const blacklistService = require('../../services/blacklist.service');

describe('query.controller', () => {

  const stub = sinon.stub();

  afterEach(() => {
    stub.resetBehavior();
  });

  describe('#query()', () => {

    it('should test query when cpf is valid and cpf is blacklisted ', () => {

      stub(blacklistService, 'retrieveBlacklist');
      blacklistService.cpfIsBlacklisted = () => {
        return Promise.resolve(true);
      };

      const cpfMock = '123.456.789-22';
      const req = new RequestMock({ query: { cpf: cpfMock } });
      const res = new ResponseMock();

      return queryController.query(req, res).then(() => {

        assert.equal(res.statusCode, 200);
        assert.equal(res.body.cpf, cpfMock);
        assert.equal(res.body.isFree, false);

      }).catch(error => assert.fail(error));

    });

    it('should test query when cpf is valid and cpf is not blacklisted ', () => {

      stub(blacklistService, 'retrieveBlacklist');
      blacklistService.cpfIsBlacklisted = () => {
        return Promise.resolve(false);
      };

      const cpfMock = '123.456.789-22';
      const req = new RequestMock({ query: { cpf: cpfMock } });
      const res = new ResponseMock();

      return queryController.query(req, res).then(() => {

        assert.equal(res.statusCode, 200);
        assert.equal(res.body.cpf, cpfMock);
        assert.equal(res.body.isFree, true);

      }).catch(error => assert.fail(error));

    });

    it('should test query when cpf is invalid', () => {

      const cpfMock = '123.456.789aaa';
      const req = new RequestMock({ query: { cpf: cpfMock } });
      const res = new ResponseMock();

      return queryController.query(req, res).then(() => {

        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error, 'Invalid cpf');

      }).catch(error => assert.fail(error));

    });

  });
});