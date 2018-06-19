const assert = require('assert');
const sinon = require('sinon');

const RequestMock = require('../utils/request-mock');
const ResponseMock = require('../utils/response-mock');

const cpfController = require('../../controllers/cpf.controller');
const blacklistService = require('../../services/blacklist.service');

describe('cpf.controller', () => {

  const stub = sinon.stub();

  afterEach(() => {
    stub.resetBehavior();
  });

  describe('#putInBlacklist()', () => {

    it('test putInBlacklist when cpf is invalid', () => {

      const cpfMock = 'xxxxxxx';

      const req = new RequestMock({ body: { cpf: cpfMock } });
      const res = new ResponseMock();

      return cpfController.putInBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error, 'Invalid cpf');

      }).catch(error => assert.fail(error));

    });

    it('test putInBlacklist when cpf is valid and cpf is not blacklisted', () => {

      const _idMock = 'asdfghqwertyjzxcvbnm';
      const cpfMock = '123.456.789-22';
      const _vMock = 0;

      stub(blacklistService, 'retrieveBlacklist');
      blacklistService.cpfIsBlacklisted = () => {
        return Promise.resolve(false);
      };

      stub(blacklistService, 'addCpfToBlacklist');
      blacklistService.addCpfToBlacklist = () => {
        return Promise.resolve({
          _id: _idMock,
          cpf: cpfMock,
          _v: _vMock
        });
      };


      const req = new RequestMock({ body: { cpf: cpfMock } });
      const res = new ResponseMock();

      return cpfController.putInBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 200);
        assert.equal(res.body.added._id, _idMock);
        assert.equal(res.body.added.cpf, cpfMock);
        assert.equal(res.body.added._v, _vMock);

      }).catch(error => assert.fail(error));

    });

    it('test putInBlacklist when cpf is valid and cpf is blacklisted', () => {

      const cpfMock = '123.456.789-22';

      stub(blacklistService, 'cpfIsBlacklisted');
      blacklistService.cpfIsBlacklisted = () => {
        return Promise.resolve(true);
      };

      const req = new RequestMock({ body: { cpf: cpfMock } });
      const res = new ResponseMock();

      return cpfController.putInBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error, 'CPF already exists');

      }).catch(error => assert.fail(error));

    });

  });

  describe('#listBlacklist()', () => {

    it('test listBlacklist should return 200 and an array in the body', () => {

      stub(blacklistService, 'retrieveBlacklist');
      blacklistService.retrieveBlacklist = () => {
        return Promise.resolve([]);
      };

      const req = new RequestMock();
      const res = new ResponseMock();

      return cpfController.listBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 200);
        assert.deepEqual(res.body, []);

      }).catch(error => assert.fail(error));

    });
  });

  describe('#removeFromBlacklist()', () => {

    it('test removeFromBlacklist when cpf is invalid', () => {

      const cpfMock = 'xxxxxxx';

      const req = new RequestMock({ params: { cpf: cpfMock } });
      const res = new ResponseMock();

      return cpfController.removeFromBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 400);
        assert.equal(res.body.error, 'Invalid cpf');

      }).catch(error => assert.fail(error));

    });

    it('test removeFromBlacklist when cpf is valid and cpf is blacklisted', () => {

      const _idMock = 'asdfghqwertyjzxcvbnm';
      const cpfMock = '123.456.789-22';
      const _vMock = 0;

      stub(blacklistService, 'retrieveBlacklist');
      blacklistService.cpfIsBlacklisted = () => {
        return Promise.resolve(true);
      };

      stub(blacklistService, 'removeCpfFromBlacklist');
      blacklistService.removeCpfFromBlacklist = () => {
        return Promise.resolve({
          _id: _idMock,
          cpf: cpfMock,
          _v: _vMock
        });
      };

      const req = new RequestMock({ params: { cpf: cpfMock } });
      const res = new ResponseMock();

      return cpfController.removeFromBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 200);
        assert.equal(res.body.removed._id, _idMock);
        assert.equal(res.body.removed.cpf, cpfMock);
        assert.equal(res.body.removed._v, _vMock);

      }).catch(error => assert.fail(error));

    });

    it('test removeFromBlacklist when cpf is valid and cpf not is blacklisted', () => {

      const cpfMock = '123.456.789-22';

      stub(blacklistService, 'cpfIsBlacklisted');
      blacklistService.cpfIsBlacklisted = () => {
        return Promise.resolve(false);
      };

      const req = new RequestMock({ params: { cpf: cpfMock } });
      const res = new ResponseMock();

      return cpfController.removeFromBlacklist(req, res).then(() => {

        assert.equal(res.statusCode, 404);
        assert.equal(res.body.error, 'CPF not found');

      }).catch(error => assert.fail(error));

    });

  });

});