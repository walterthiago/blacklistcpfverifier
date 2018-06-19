const blacklistService = require('../services/blacklist.service');
const cpfService = require('../services/cpf.service');
const counterService = require('../services/counter.service');

const handleError = require('../errors/handle.error');

const BadRequestError = require('../errors/custom/bad-request.error');

const query = (req, res) => {

  const cpf = req.query.cpf;

  return cpfService.cpfIsValid(cpf).then(cpfIsValid => {

    if (!cpfIsValid) {
      throw new BadRequestError('Invalid cpf');
    }

    return blacklistService.cpfIsBlacklisted(cpf);

  }).then(cpfIsBlacklisted => {

    counterService.count();

    res.status(200).json({
      cpf: cpf,
      isFree: !cpfIsBlacklisted
    });

  }).catch(error => handleError(error, res));

};

module.exports = exports = {
  query
}