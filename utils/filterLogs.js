const { convertISODateToNumber } = require("./manageDate.js");

function filterLogs(user, from, to, limit) {
	// "from" and "to" are dates in the format YYYY-MM-DD

	// Remove logs before "from"
	if (from) {
		from = convertISODateToNumber(from);
		user.log = user.log.filter((ex) => convertISODateToNumber(ex.date) >= from);
	}

	// Remove logs after "to"
	if (to) {
		to = convertISODateToNumber(to);
		user.log = user.log.filter((ex) => convertISODateToNumber(ex.date) <= to);
	}

	// Limit the number of logs
	if (limit) user.log = user.log.slice(0, limit);

	user.count = user.log.length;
	return user;
}

module.exports = { filterLogs };
