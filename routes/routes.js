const express = require("express");
const { handleCreateUser, handleGetUsers } = require("../controllers/handleUser.js");
const {
	handleAddExercise,
	handleGetExercises,
} = require("../controllers/handleExercise.js");

const router = express.Router();

router.get("/users", handleGetUsers); // Get all users from the database
router.post("/users", handleCreateUser); // Create a new user

router.get("/users/:_id/logs", handleGetExercises); // Get all exercises from a user
router.post("/users/:_id/exercises", handleAddExercise); // Add an exercise to a user

module.exports = router;
