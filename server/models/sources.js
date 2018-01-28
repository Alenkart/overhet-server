'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sources = new Schema({
	name: String,
	image: String,
	status: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Sources', Sources);