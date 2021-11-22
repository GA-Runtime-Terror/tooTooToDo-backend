const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const toDoItem = require('./toDoItem');

const listSchema = new Schema({
	title: String,
	toDoItems: [toDoItem],
});

module.exports = mongoose.model('List', listSchema);
