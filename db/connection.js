const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/list', { useNewUrlParser: true }, () => {
	console.log('we in');
});

module.exports = mongoose;
