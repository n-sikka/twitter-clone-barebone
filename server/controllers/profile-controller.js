var User = require('../datasets/users');
var fs = require('fs-extra');
var path = require('path');

module.exports.uploadPhoto = function(req, res) {
  var file = req.files.file;
  var userId = req.body.userId;

  // console.log("User - " + userId + " is submitting ", file);

  var newDate = new Date();
  //isostring so we can manipulate date later


  var tmpPath = file.path;
  var targetPath = path.join(__dirname, "../uploads/" + userId + file.name);
  var savePath = "/uploads/" + userId  + file.name;

  fs.rename(tmpPath, targetPath, function(err){

    if(err) {
      console.log(err)
    } else {
      // console.log("file moved")
      User.findById(userId, function(err, userData){
        var user = userData;
        user.image = savePath;
        user.save(function(err){
          if(err) {
            res.json({status: 500})
          } else {
            res.json({status: 200})
          }
        })
      })
    }

  })
}


module.exports.updateUsername = function(req, res) {
  var username = req.body.username;
  var userId = req.body.userId;

  User.findById(userId, function(err, userData){
    var user = userData;
    user.username = username;

    user.save(function(err){
      if(err) {
        console.log(err);
        res.json({status: 500})
      } else {
        console.log('success')
        res.json({status: 200})
      }
    })
  })

}

module.exports.updateBio = function(req, res) {
  var bio = req.body.bio;
  var userId = req.body.userId;

  User.findById(userId, function(err, userData){
    var user = userData;
    user.bio = bio;

    user.save(function(err){
      if(err) {
        console.log(err);
        res.json({status: 500})
      } else {
        console.log('success')
        res.json({status: 200})
      }
    })
  })

}
