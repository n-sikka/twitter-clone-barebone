var User = require('../datasets/users');

module.exports.signup = function(req, res) {
  // console.log(req.body);
  var user = new User(req.body);
  user.save();

  res.json('Created!');

}

module.exports.login = function(req, res) {
  //find for the user requesting login, and the process if/else
  User.find(req.body, function(err, results){
    if(err) {
      console.log("Error Out");
    }
    if(results && results.length === 1) {
      var userData = results[0];


      //this has edgecase when user is signin up for the first time.
      //should probably create an onboarding screen for the user and get these datasets.
      res.json({email: req.body.email,
                _id: userData._id,
                userName: userData.userName,
                image: userData.image
              });
    }
  })

}
