const express = require('express');
// const ejs = require('ejs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// registering middleware
app.use(function(req, res, next) {
	var now = new Date().toString();
	var log = now + ": " + req.method + req.url;
	console.log(log);
	fs.appendFile('server.log', log + '\n', function(err) {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// maintenance mode! middleware
// app.use(function(req, res, next) {
// 	res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website',
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', function(req, res) {
	res.render('about', {
		pageTitle: 'Abouttt Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', function(req, res){
	res.send({
		errorMessage: 'Doesnt work'
	});
});



// app.listen(3000, function() {
// 	console.log('Server is up on port 3000!');
// });
app.listen(port, function() {
	console.log('Server is up on port ' + port);
});