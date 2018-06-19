const BlacklistModel = require('../models/blacklist.model');


function addCpfToBlacklist(cpf) {
  return BlacklistModel.create({ cpf: cpf });
}

function retrieveBlacklist() {
  return BlacklistModel.find();
}

function cpfIsBlacklisted(cpf) {
  return new Promise((resolve, reject) => {
    BlacklistModel.findOne({ cpf: cpf }).then(found => {
      
      if (found && found.cpf) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch(error => {
      reject(error);
    });
  });
}

function removeCpfFromBlacklist(cpf) {
  return BlacklistModel.findOneAndRemove({ cpf: cpf });
}

module.exports = exports = {
  addCpfToBlacklist, retrieveBlacklist, cpfIsBlacklisted, removeCpfFromBlacklist
}