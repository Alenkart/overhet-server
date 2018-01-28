'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
	title: { 
		type : String, 
		default : 'An amazing title should be here' 
	},
	link: { 
		type : String, 
		default : '404' 
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
	type: {
		type: String,
		default: 'GAME'
	},
	status: { 
		type: Boolean, 
		default: false 
	}
});

Products.virtual('imagePath').get(function() {
	return 'localhost' + this.image;
});

module.exports = mongoose.model('Products', Products);