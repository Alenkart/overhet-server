'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
	title: String,
	link: String,
	description: String,
	source: {
		ref: 'Sources',
		type: Schema.Types.ObjectId, 
	},
	url: { 
		type : String, 
		default : '404' 
	},
	price: { 
		type : Number, 
		default : 0 
	},
	offer: { 
		type : Number, 
		default : 0 
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
		default: 0 
	}
});

module.exports = mongoose.model('Products', Products);