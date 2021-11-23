const User = require('../models/user');
const seedData = require('./seedData');
const List = require('../models/toDoList');

List.deleteMany({}).then(() => {
	List.insertMany(seedData.lists, (err) => {
		if (err) console.log(err);
		else {
			User.deleteMany({}).then(() => {
				User.insertMany(seedData.users, (err) => {
					if (err) console.log(err);
					else {
						console.log('seed donezo');
						process.exit();
					}
				});
			});
		}
	});
});
