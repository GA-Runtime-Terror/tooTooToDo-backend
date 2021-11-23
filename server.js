const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send({
		status: 200,
		msg: "you've hit the default route nothing to see here",
	});
});

const listController = require('./controllers/toDoList');
app.use('/lists', listController);

const userController = require('./controllers/user');
app.use('/users', userController);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`PORT: ${app.get('port')}`);
});
