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
		
//		console.log(targetId + ' is now being followed by ' + userId);
		
		User.findById(targetId, function(err, target){
				if(err) {
						console.log(err)
				} else{
						target.followers.push({userId: userId})
						target.update()
				}
		})
		
//		User.findById(userId, function(err, user){
//				if(err) {
//						console.log(err)
//				} else {
//						if(!user.following) {
//								user.following = [];
//						}
//						console.log()
//						user.following.push({userId: targetId})
//						user.save();
//				}
//		})
}








