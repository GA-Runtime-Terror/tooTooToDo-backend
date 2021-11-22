const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
	User.find({}).then((allUsers) => {
		res.json({
			status: 200,
			Users: allUsers,
		});
	});
});

router.get('/:id', (req, res) => {
	User.find({"_id": req.params.id}).then((user) => {
		res.json({
			status: 200,
			User: user.userName,
      Lists: user.toDoLists
		});
	});
});

router.get('/login/:userName', (req, res) => {
	User.find({ userName: req.params.userName }).then((user) => {
    
    res.json({
			status: 200,
			User: user.userName,
			Lists: user.toDoLists,
		});
	});
});

router.post('/', (req, res) => {
	User.create(req.body, (err) => {
		if (err) console.log(err);
		else {
			User.find({}).then((Users) => res.json(Users));
		}
	});
});

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

router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id, (err, item) => {
		if (err) console.log(err);
		else res.json(item);
	});
});

module.exports = router;
