const mongoose = require('mongoose');
let Blacklist = {};

if(process.env['MAXMILHAS_ENV'] === 'test') {
    Blacklist = {};
} else {
    mongoose.connect('mongodb://localhost:27018/admin', { user: 'root', pass: 'root' });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Mongo connected successfully')
    });
    
    Blacklist = mongoose.model('Blacklist', { cpf: String });
}


module.exports = exports = Blacklist;