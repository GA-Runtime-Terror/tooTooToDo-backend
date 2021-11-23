const express = require('express');
const router = express.Router();
const List = require('../models/toDoList');

//Get all lists in database
router.get('/', (req, res) => {
	List.find({}).then((allList) => {
		res.json({
			status: 200,
			list: allList,
		});
	});
});

//Get a list by id
router.get('/:id', (req, res) => {
	List.find({ _id: req.params.id }).then((list) => {
		res.json({
			status: 200,
			list: list,
		});
	});
});

//Add a list to database
router.post('/', (req, res) => {
	List.create(req.body, (err) => {
		if (err) console.log(err);
		else {
			List.find({}).then((list) => res.json(list));
		}
	});
});

//Add a task to list by id of the list
router.post('/:id', async (req, res) => {
	const task = await List.findByIdAndUpdate(req.params.id, {
		$push: { toDoItems: req.body },
		new: true,
	});
	res.json({ status: 200, data: task });
});

//Update a list by id
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

//Delete a list by id
router.delete('/:id', (req, res) => {
	List.findByIdAndDelete(req.params.id, (err, item) => {
		if (err) console.log(err);
		else res.json(item);
	});
});

//Delete a task by id of both the task and parent list
router.delete('/:listId/:taskId', async (req, res) => {
	const list = await List.findById(req.params.listId);
	list.toDoItems.pull({ _id: req.params.taskId });
	await list.save();
	const allList = await List.find({});
	res.json(allList);
});

module.exports = router;
