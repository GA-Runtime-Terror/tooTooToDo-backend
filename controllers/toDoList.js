const express = require('express');
const router = express.Router();
const List = require('../models/toDoList');

router.get('/', (req, res) => {
	List.find({}).then((allList) => {
		res.json({
			status: 200,
			list: allList,
		});
	});
});

router.get('/:id', (req, res) => {
	List.find({ _id: req.params.id }).then((list) => {
		res.json({
			status: 200,
			list: list
		});
	});
});

router.post('/', (req, res) => {
	List.create(req.body, (err) => {
		if (err) console.log(err);
		else {
			List.find({}).then((list) => res.json(list));
		}
	});
});

router.put('/:id', (req, res) => {
	List.findByIdAndUpdate(
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
	List.findByIdAndDelete(req.params.id, (err, item) => {
		if (err) console.log(err);
		else res.json(item);
	});
});

module.exports = router;
