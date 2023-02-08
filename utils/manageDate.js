const getDateForNewExercise = (date) => {
	if (!date || date === "") return Date.now();

	// convert date (yyyy-mm-dd) to number
	const dateArr = date.split("-");
	const year = dateArr[0];
	const month = dateArr[1] - 1;
	const day = dateArr[2];

	return new Date(year, month, day).getTime();
};

// const convertDateToISO = (date) => new Date(date).toISOString().slice(0, 10);
const convertDateToString = (date) => new Date(date).toDateString();

const convertISODateToNumber = (date) => new Date(date).getTime(); // date: "yyyy-mm-dd"

module.exports = {
	getDateForNewExercise,
	convertISODateToNumber,
	convertDateToString,
};
