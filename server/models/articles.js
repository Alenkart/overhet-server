'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Articles = new Schema({
	title: { 
		type : String, 
		default : 'An amazing title should be here' 
	},
	url: { 
		type : String, 
		default : '404' 
	},
	description: { 
		type : String, 
		default : 'An awesome title should be here' 
	},
	source: {
		ref: 'Sources',
		type: Schema.Types.ObjectId, 
	},
	image: { 
		type : String, 
		default : 'default.jpg' 
	},
	date: { 
		type: Date, 
		default: Date.now 
	},
	status: { 
		type: Boolean, 
		default: false 
	}
});

module.exports = mongoose.model('Articles', Articles);