const ConnectDatabase = require("../models/connectDatabase.js");
const { getDateForNewExercise, convertDateToISO } = require("../utils/manageDate.js");
const { filterLogs } = require("../utils/filterLogs.js");

async function handleAddExercise(req, res) {
	const newExercise = {
		userId: req.params._id,
		description: req.body.description,
		duration: req.body.duration,
		date: getDateForNewExercise(req.body.date),
	};

	const db = new ConnectDatabase();
	const result = await db.storeNewExercise(newExercise);
	const user = await db.getUserById(result.userId);

	const resResult = {
		_id: result.userId,
		username: user.username,
		date: convertDateToISO(result.date),
		duration: result.duration,
		description: result.description,
	};

	return res.json(resResult);
}

async function handleGetExercises(req, res) {
	const userId = req.params._id;
	const from = req.query.from;
	const to = req.query.to;
	const limit = req.query.limit;

	const db = new ConnectDatabase();
	const exercises = await db.getExercisesByUserId(userId);
	const user = await db.getUserById(userId);

	/* 
   Creating a new object with the
   user's id, username, count of exercises, and the log of exercises.
    */
	const result = {
		_id: user._id,
		username: user.username,
		count: exercises.length,
		log: exercises.map((exercise) => {
			return {
				description: exercise.description,
				duration: exercise.duration,
				date: convertDateToISO(exercise.date),
			};
		}),
	};

	// If there are filters, filter the result
	const filteredResult = filterLogs(result, from, to, limit);
	return res.json(filteredResult);
}

module.exports = { handleAddExercise, handleGetExercises };
