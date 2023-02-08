const ConnectDatabase = require("../models/connectDatabase.js");

async function handleCreateUser(req, res) {
	const newUser = { username: req.body.username };
	const db = new ConnectDatabase();
	const result = await db.storeNewUser(newUser);

	return res.json(result);
}

async function handleGetUsers(req, res) {
	const db = new ConnectDatabase();
	const result = await db.getStoredUsers();

	return res.json(result);
}

module.exports = { handleCreateUser, handleGetUsers };
