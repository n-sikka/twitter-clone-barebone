var User = require('../datasets/users');

module.exports.getUsers = function(req, res) {
    User.find({}, function(err, users){
          if(err){
            console.log(err)
          } else {
            res.json(users);
          }
        })
}

module.exports.followUser = function(req, res) {
		var userId = req.body.user;
		var targetId = req.body.targetUser;


		User.findById(targetId, function(err, target){
				if(err) {
						console.log(err)
				} else{
            target.followers.addToSet({userId: userId})
						target.save(function(err){
              if(err){
                console.log(err)
              }
            })

				}
		})

		User.findById(userId, function(err, user){
				if(err) {
						console.log(err)
				} else {
            user.following.addToSet({userId: targetId})
						user.save(function(err){
              if(err){
                console.log(err)
              }
            })
				}
		})

    User.find({}, function(err, users){
      if(err) {
        console.log(err);
      }else {
        res.json(users)
      }
    })
}

module.exports.unfollowUser = function(req, res) {
		var userId = req.body.user;
		var targetId = req.body.targetUser;

    User.findByIdAndUpdate(targetId, {
        $pull: {followers: {
            userId: userId
        }}
    }, function(err) {
        console.log(err);
    });


    User.findByIdAndUpdate(userId, {
        $pull: {following: {
            userId: targetId
        }}
    }, function(err) {
        console.log(err);
    });

    User.find({}, function(err, users){
      if(err) {
        console.log(err);
      }else {
        res.json(users)
      }
    })
}
