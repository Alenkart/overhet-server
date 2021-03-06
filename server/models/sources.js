'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sources = new Schema({
	image: { 
		type : String, 
		default : 'default.jpg' 
	},
	name: {
		type: String,
		default: 'Overhet',
	},
	status: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Sources', Sources);