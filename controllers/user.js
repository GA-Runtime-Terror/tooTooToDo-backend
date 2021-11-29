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
// router.get('/:name', (req, res) => {
// 	User.findOne({ userName: req.params.name })
// 		.populate()
// 		.then((user) => {
// 			res.json({
// 				status: 200,
// 				User: user.userName,
// 				List: user.toDoList,
// 			});
// 		});
// });

//Login user: check name then password
router.get('/login', (req, res) => {
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
	//check if the user already exist in database or not by username
	User.findOne({ userName: req.body.userName }, (err, user) => {
		//if any error occurs
		if (err) throw err;
		//if user exists send error msg
		if (user)
			res.json({
				status: 400,
				msg: 'Username taken',
			});
		else {
			//else, create a new list
			const newList = new List({
				title: 'todos',
				toDoItems: [],
			});
			//save the list to database
			newList.save((err) => {
				if (err) throw err;
				//create a new user and ref the added list to the newly created user
				const newUser = new User({
					userName: req.body.userName,
					password: req.body.password,
					toDoList: newList._id,
				});
				//save the new user to database then return the user to client
				newUser.save((err) => {
					if (err) throw err;
					res.json({
						status: 200,
						id: newUser._id,
						name: newUser.userName,
						list: newList,
					});
				});
			});
		}
	});
});

//Add a list to user by of both user and the list adding to
// router.post('/:userId/addList/:listId', async (req, res) => {
// 	const list = await List.findById(req.params.listId);
// 	const user = await User.findByIdAndUpdate(req.params.userId, {
// 		toDoList: list.id,
// 		new: true,
// 	});
// 	res.json({ status: 200, data: user });
// });

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
router.delete('/', (req, res) => {
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
				if (isMatch)
					User.findByIdAndDelete(user._id, (err) => {
						if (err) console.log(err);
						else
							res.json({
								status: 200,
								msg: 'user deleted',
							});
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

module.exports = router;
