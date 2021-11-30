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
// router.post('/', (req, res) => {
// 	List.create(req.body, (err) => {
// 		if (err) console.log(err);
// 		else {
// 			List.find({}).then((list) => res.json(list));
// 		}
// 	});
// });

//Add a task to list by id of the list
router.post('/:id', async (req, res) => {
	console.log('req:', req);
	List.findByIdAndUpdate(req.params.id, {
		$push: { toDoItems: req.body },
	}).then(
		List.find({}).then((task) => {
			res.json({ status: 200, data: task });
		})
	);
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
// router.delete('/:id', (req, res) => {
// 	List.findByIdAndDelete(req.params.id, (err, item) => {
// 		if (err) console.log(err);
// 		else res.json(item);
// 	});
// });

//Delete a task by id of both the task and parent list
router.delete('/:listId/:taskId', async (req, res) => {
	List.findById(req.params.listId).then((list) => {
		list.toDoItems.pull({ _id: req.params.taskId });
		list.save().then(() => {
			List.findById(req.params.listId).then((updatedList) => {
				res.json({
					status: 200,
					msg: 'task deleted',
					list: updatedList,
				});
			});
		});
	});
});

module.exports = router;
