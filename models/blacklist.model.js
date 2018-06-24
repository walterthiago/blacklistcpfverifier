const mongoose = require('./mongoose');
let Blacklist = {};

if(process.env['APP_ENV'] === 'test') {
    Blacklist = {};
} else {
    Blacklist = mongoose.model('Blacklist', { cpf: String });
}


module.exports = exports = Blacklist;