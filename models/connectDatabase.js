const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;

class ConnectDatabase {
	constructor() {
		this.uri = process.env.DB_URI;
		this.client = new MongoClient(this.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}

	async connect() {
		try {
			await this.client.connect();
		} catch (error) {
			console.log(error);
		}
	}

	async close() {
		try {
			await this.client.close();
		} catch (error) {
			console.log(error);
		}
	}

	//*  Getters - Get data from the database
	async getStoredUsers() {
		try {
			await this.connect();
			// DataBase - ExerciseTracker | Collection - Users
			const collection = this.client.db("ExerciseTracker").collection("Users");
			const result = await collection.find({}).toArray();
			return result;
		} catch (error) {
			console.log(error);
		} finally {
			this.close();
		}
	}

	async getUserById(userId) {
		try {
			await this.connect();
			// DataBase - ExerciseTracker | Collection - Users
			const collection = this.client.db("ExerciseTracker").collection("Users");
			const result = await collection.findOne({ _id: new ObjectId(userId) });
			return result;
		} catch (error) {
			console.log(error);
		} finally {
			this.close();
		}
	}

	async getExercisesByUserId(userId) {
		try {
			await this.connect();
			// DataBase - ExerciseTracker | Collection - Exercises
			const collection = this.client.db("ExerciseTracker").collection("Exercises");
			const result = await collection.find({ userId: userId }).toArray();
			return result;
		} catch (error) {
			console.log(error);
		} finally {
			this.close();
		}
	}

	//* Setters - Store new data in the database
	async storeNewUser(newUser) {
		try {
			await this.connect();
			// DataBase - ExerciseTracker | Collection - Users
			const collection = this.client.db("ExerciseTracker").collection("Users");
			await collection.insertOne(newUser);
			return newUser;
		} catch (error) {
			console.log(error);
		} finally {
			this.close();
		}
	}

	async storeNewExercise(newExercise) {
		try {
			await this.connect();
			// DataBase - ExerciseTracker | Collection - Exercises
			const collection = this.client.db("ExerciseTracker").collection("Exercises");
			await collection.insertOne(newExercise);
			return newExercise;
		} catch (error) {
			console.log(error);
		} finally {
			this.close();
		}
	}
}

module.exports = ConnectDatabase;
