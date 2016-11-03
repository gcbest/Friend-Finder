var friendsList = require('../data/friends.js');

module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function (req, res) {
		res.json(friendsList);
	});

	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function (req, res) {
		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table
		// if (friendsList.length >= 0) {
			var currentUserScores = req.body.scores;
			var lowestDifference = 100;
			var difference = 0;
			var bestMatch = friendsList[0];
			for(var i = 0; i < friendsList.length; i++) {
				var possibleMatchScores = friendsList[i].scores;
				for (var j = 0; j < possibleMatchScores.length; j++){
					difference += Math.abs(currentUserScores[j] - possibleMatchScores[j]);
					console.log("Possible match scorces: " + possibleMatchScores[j]);
					console.log("Difference: " + difference);
				}

				if (difference <= lowestDifference) {
						lowestDifference = difference;
						bestMatch = friendsList[i];
					}

				difference = 0;
			}


			friendsList.push(req.body);

			
			res.json(bestMatch); // KEY LINE
	});

	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	app.post('/api/clear', function () {
		// Empty out the arrays of data
		tableData = [];
		waitListData = [];

		console.log(tableData);
	});
};
