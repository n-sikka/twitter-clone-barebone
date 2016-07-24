var Bitch = require('../datasets/bitch');

module.exports.postBitch = function(req, res) {
  var bitch = new Bitch(req.body);

  bitch.save(function(err){
    if(err) {
      console.log(err);
    }
  });

  Bitch.find({}, function(err, bitches){
    if(err) {
      console.log(err)
    } else {
      //to update bitches on view on each new post so as to get all other simultaneous posts updated too
      var newList = bitches;
      newList.push(bitch);
      res.json(newList);
    }
  })

}


module.exports.getBitches = function(req, res) {
  Bitch.find({})
        .sort({date: 'descending'})
        .exec(function(err, bitches){
          if(err){
            console.log(err)
          } else {
            res.json(bitches);
          }
        })
}
