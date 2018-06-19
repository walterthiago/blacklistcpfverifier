const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors
app.use(require('cors')());


const fs = require('fs');
const path = require('path');

fs.readdirSync('./routes').forEach(route => {
    app.use('/', require(path.join(__dirname, 'routes', route)));
});

app.listen(3000);