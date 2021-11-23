const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/list', { useNewUrlParser: true }, () => {
// 	console.log('we in');
// });

mongoose.Promise = Promise;
let mongoURI = '';
if (process.env.NODE_ENV === 'production') {
	mongoURI = process.env.DB_URI;
} else {
	mongoURI = 'mongodb://localhost/todolist';
}

mongoose
	.connect(mongoURI, { useNewUrlParser: true })
	.then((instance) => {
		console.log(`Connected to db: ${instance.connections[0].name}`);
	})
	.cath((error) => {
		console.log('Connection failed', error);
	});

module.exports = mongoose;

//'mongodb+srv://admin:adminPassword@cluster0.74tjr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
