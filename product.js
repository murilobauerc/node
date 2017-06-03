const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	value: Number,
	name: String
});

module.exports = mongoose.model('Product', ProductSchema);
