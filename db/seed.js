const User = require('../models/user');
const seedData = require('./seedData');
const List = require('../models/toDoList');

List.deleteMany({}).then(() => {
	List.insertMany(seedData.lists, (err, lists) => {
		if (err) console.log(err);
		else {
			User.deleteMany({}).then(() => {
				console.log('seed donezo');
			});
			console.log('seed done?');
		}
		process.exit();
	});
});
