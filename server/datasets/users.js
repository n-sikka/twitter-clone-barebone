// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  email: String,
  password: String,
  username: String,
  bio: String,
  image: String,
  following: [
              {
                _id : false,
								userId: String
							}
            ],
  followers: [
              {
                _id : false,
								userId: String
							}
            ]
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;


//wrong way to create models. Always use schemas
//var mongoose = require('mongoose');
//
////create a new model 'User' using mongoose's default model
//module.exports = mongoose.model('User', {
//  email: String,
//  password: String,
//  username: String,
//  bio: String,
//  image: String,
//  following: {
//              userId: String,
//              username: String
//            },
//  followers: {
//              userId: String,
//              username: String
//            }
//
//});
