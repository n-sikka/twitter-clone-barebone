var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

var authenticationController = require('./server/controllers/authentication-controller');
var profileController = require('./server/controllers/profile-controller');
var bitchController = require('./server/controllers/bitch-controller');
var usersController = require('./server/controllers/users-controller');


var app = express();

mongoose.connect('mongodb://localhost:27017/time-suck');

app.use(multipartMiddleware);
//for parsing json data (otherwise it gives out undefined on any external request on server side)
app.use(bodyParser.json());

//to tell node there are static folder
app.use('/public', express.static(__dirname + "/public" ));
app.use('/node_modules', express.static(__dirname + "/node_modules" ));
app.use('/uploads', express.static(__dirname + "/uploads" ));


//Get the main index file to serve
app.get('/', function(req, res){

	res.sendFile(path.join(__dirname, 'index.html'));

})

//Set up server for this app at 3000 port
app.listen('3000', function(){

	console.log('Server Started at localhost:3000');

});


//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto', multipartMiddleware, profileController.uploadPhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

//Bitch
app.post('/api/bitch/post', bitchController.postBitch);
app.post('/api/bitch/get', bitchController.getBitches);

//user
app.get('/api/users/get', usersController.getUsers)
app.post('/api/users/follow', usersController.followUser)
app.post('/api/users/unfollow', usersController.unfollowUser)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
		err.status = 404;
    next(err);
});














//
