'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Articles = new Schema({
	title: String,
	url: String,
	description: String,
	source: {
		ref: 'Sources',
		type: Schema.Types.ObjectId, 
	},
	image: { 
		type : String, 
		default : 'default.jpg' 
	},
});

module.exports = mongoose.model('Articles', Articles);