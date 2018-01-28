'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('./server/helpers/mongoose');

const app = express();

//settings
app.set('__dirname', __dirname);
app.set('json spaces', 2);
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(fileUpload());
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