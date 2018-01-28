'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./server/helpers/mongoose');

//settings
app.set('json spaces', 2);
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

//controllers
app.use(require('./server/controllers/home'));
app.use(require('./server/controllers/products'));
app.use(require('./server/controllers/sources'));
app.use(require('./server/controllers/articles'));

app.listen(app.settings.port, () => {
	console.log(`app is listening on port ${app.settings.port}`);
});