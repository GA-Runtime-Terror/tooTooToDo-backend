const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/toDoList');

//Get all the users
router.get('/', (req, res) => {
	User.find({})
		.populate('toDoList')
		.then((allUsers) => {
			res.json({
				status: 200,
				Users: allUsers,
			});
		});
});

//Get a user by id
// router.get('/:id', (req, res) => {
// 	User.find({ _id: req.params.id }).then((user) => {
// 		res.json({
// 			status: 200,
// 			User: user.userName,
// 			Lists: user.toDoLists,
// 		});
// 	});
// });

//Get a user by userName
router.get('/:name', (req, res) => {
	User.findOne({ userName: req.params.name })
		.populate()
		.then((user) => {
			res.json({
				status: 200,
				User: user.userName,
				List: user.toDoList,
			});
		});
});

router.get('/login/authenticate', (req, res) => {
	User.findOne({ userName: req.query.userName }, (err, user) => {
		if (err) throw err;
		if (!user)
			res.send({
				status: 401,
				res: 'invalid credentials: no username',
			});
		else
			user.comparePassword(req.query.password, (err, isMatch) => {
				if (err) throw err;
				console.log('password', isMatch);
				if (isMatch)
					res.send({
						status: 200,
						name: user.userName,
						id: user._id,
						toDoList: user.toDoList,
					});
				else {
					res.send({
						status: 401,
						res: 'invalid credentials: password',
					});
				}
			});
	});
});

//Add a user in database
router.post('/', (req, res) => {
	const newList = new List({
		title: 'todos',
		toDoItems: [],
	});
	const newUser = new User({
		userName: req.body.userName,
		password: req.body.password,
		toDoList: newList.id,
	});

	newUser.save((err) => {
		if (err) throw err;
		res.json({ status: 200, name: newUser.userName, id: newUser._id });
	});
});

//Add a list to user by of both user and the list adding to
router.post('/:userId/addList/:listId', async (req, res) => {
	const list = await List.findById(req.params.listId);
	const user = await User.findByIdAndUpdate(req.params.userId, {
		toDoList: list.id,
		new: true,
	});
	res.json({ status: 200, data: user });
});

//Update a user by id
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, item) => {
			if (err) console.log(err);
			else res.json(item);
		}
	);
});

//Delete a user by id
router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, item) => {
		if (err) console.log(err);
		else res.json(item);
	});
});

module.exports = router;
