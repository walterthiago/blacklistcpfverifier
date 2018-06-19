const blacklistService = require('../services/blacklist.service');
const counterService = require('../services/counter.service');

const handleError = require('../errors/handle.error');


const health = (req, res) => {
  return blacklistService.retrieveBlacklist().then(blacklist => {

    res.status(200).json({
      uptime: process.uptime(),
      queries: counterService.getCounter(),
      blacklistSize: blacklist.length
    });

  }).catch(error => handleError(error, res));

};

module.exports = exports = {
  health
}