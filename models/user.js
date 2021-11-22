const mongoose = require('../db/connection');
const Schema = mongoose.Schema;

const toDoList = require('./toDoList')

const userSchema = new Schema({
	userName: String,
	password: String,
  toDoLists: [{ref:"List", type: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('User', userSchema);
