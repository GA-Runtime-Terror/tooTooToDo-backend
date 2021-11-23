require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const parser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(parser.json());

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
app.listen(app.get('port'), () => console.log(`PORT: ${app.get('port')} 🌟`));
