const assert = require('assert');
const cpfService = require('../../services/cpf.service');


describe('cpf.service', () => {

  describe('#cpfIsValid()', () => {

    it('should return false when cpf is not present', () => {

      return cpfService.cpfIsValid().then(isValid => {
        assert.equal(isValid, false);
      }).catch(error => assert.fail(error));

    });

    it('should return false when cpf is a number without mask', () => {

      return cpfService.cpfIsValid(12345678912).then(isValid => {
        assert.equal(isValid, false);
      }).catch(error => assert.fail(error));

    });

    it('should return false when cpf is a string without mask', () => {

      return cpfService.cpfIsValid('12345678912').then(isValid => {
        assert.equal(isValid, false);
      }).catch(error => assert.fail(error));

    });

    it('should return true when cpf is a string with mask ###.###.###-##', () => {

      return cpfService.cpfIsValid('123.456.789-12').then(isValid => {
        assert.equal(isValid, true);
      }).catch(error => assert.fail(error));

    });

  });
});