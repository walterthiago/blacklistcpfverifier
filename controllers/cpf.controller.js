const blacklistService = require('../services/blacklist.service');
const cpfService = require('../services/cpf.service');

const handleError = require('../errors/handle.error');

const BadRequestError = require('../errors/custom/bad-request.error');
const NotFoundError = require('../errors/custom/not-found.error');

const putInBlacklist = (req, res) => {

  const cpf = req.body.cpf;

  return cpfService.cpfIsValid(cpf).then(cpfIsValid => {

    if (!cpfIsValid) {
      throw new BadRequestError('Invalid cpf');
    }

    return blacklistService.cpfIsBlacklisted(cpf);

  }).then(isBlacklisted => {

    if (isBlacklisted) {
      throw new BadRequestError('CPF already exists');
    }

    return blacklistService.addCpfToBlacklist(cpf);

  }).then(added => {
    res.status(200).json({
      added: added
    });
  }).catch(error => handleError(error, res));

}

const listBlacklist = (req, res) => {
  return blacklistService.retrieveBlacklist().then(blacklist => {
    res.status(200).json(blacklist);
  }).catch(error => handleError(error, res));
}

const removeFromBlacklist = (req, res) => {

  const cpf = req.body.cpf;

  return cpfService.cpfIsValid(cpf).then(cpfIsValid => {

    if (!cpfIsValid) {
      throw new BadRequestError('Invalid cpf');
    }

    return blacklistService.cpfIsBlacklisted(cpf);

  }).then(isBlacklisted => {

    if (!isBlacklisted) {
      throw new NotFoundError('CPF not found');
    }

    return blacklistService.removeCpfFromBlacklist(cpf);

  }).then(removed => {
    res.status(200).json({
      removed: removed
    });
  }).catch(error => handleError(error, res));

}

module.exports = exports = {
  putInBlacklist, listBlacklist, removeFromBlacklist
}