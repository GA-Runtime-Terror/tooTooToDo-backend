const express = require('express');
const router = express.Router();
const User = require('../models/user');
const List = require('../models/toDoList');

//Get all the users
router.get('/', (req, res) => {
	User.find({})
		.populate('toDoLists')
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
				Lists: user.toDoLists,
			});
		});
});

router.get('/login/authenticate', (req, res) => {
	User.getAuthenticated(
		req.params.userName,
		req.params.password,
		function (err, user, reason) {
			if (err) {
				// throw err;
				res.json({
					status: 'error',
					error: err,
				});
			}

			// login was successful if we have a user
			if (user) {
				// handle login success
				console.log('login success');
				res.json({
					status: 200,
					user: user,
				});
				return;
			}

			// otherwise we can determine why we failed
			var reasons = User.failedLogin;
			switch (reason) {
				case reasons.NOT_FOUND:
				case reasons.PASSWORD_INCORRECT:
					// note: these cases are usually treated the same - don't tell
					// the user *why* the login failed, only that it did
					res.json({
						status: 'error',
						reason: reasons,
					});
					break;
				case reasons.MAX_ATTEMPTS:
					// send email or otherwise notify user that account is
					// temporarily locked
					res.json({
						status: 'error',
						reason: reasons,
					});
					break;
			}
		}
	);
});

//Add a user in database
router.post('/', (req, res) => {
	let newUser = new User({
		userName: req.body.userName,
		password: req.body.password,
	});

	newUser.save((err) => {
		if (err) throw err;
		res.json({ status: 200, user: newUser });
	});
});

//Add a list to user by of both user and the list adding to
router.post('/:userId/addList/:listId', async (req, res) => {
	const list = await List.findById(req.params.listId);
	const user = await User.findByIdAndUpdate(req.params.userId, {
		$push: { toDoLists: list.id },
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
