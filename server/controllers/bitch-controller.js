var Bitch = require('../datasets/bitch');

module.exports.postBitch = function(req, res) {

  var bitch = new Bitch(req.body);
  bitch.save(function(err){
    if(err) {
      console.log(err);
    }
  });

  if(!req.body.following){

    var response = {}
    res.json(response)

  } else {
    var requestedBitches = []
    for(var i = 0, len = req.body.following.length; i < len; i++) {
      requestedBitches.push({userId : req.body.following[i].userId})
    }

    Bitch.find({ $or : requestedBitches })
          .sort({date: 'descending'})
          .exec(function(err, bitches){
            if(err){
              console.log(err)
            } else {
              var newList = bitches;
              newList.push(bitch);
              res.json(newList);;
            }
          })

  }

}


module.exports.getBitches = function(req, res) {
  if(!req.body.following){

    var response = {}
    res.json(response)

  } else {
    var requestedBitches = []
    for(var i = 0, len = req.body.following.length; i < len; i++) {
      requestedBitches.push({userId : req.body.following[i].userId})
    }

    Bitch.find({ $or : requestedBitches })
          .sort({date: 'descending'})
          .exec(function(err, bitches){
            if(err){
              console.log(err)
            } else {
              res.json(bitches);
            }
          })

  }
}
