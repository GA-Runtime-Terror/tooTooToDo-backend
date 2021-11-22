const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	name: String,
  priority: Number
});

module.exports = itemSchema;
