let Blacklist = {};

if(process.env['APP_ENV'] === 'test') {
    Blacklist = {};
} else {
    const mongoose = require('./mongoose');
    Blacklist = mongoose.model('Blacklist', { cpf: String });
}


module.exports = exports = Blacklist;