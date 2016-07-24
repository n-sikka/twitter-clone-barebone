var mongoose = require('mongoose');

module.exports = mongoose.model('Bitch', {
  user: 'String',
  userId: 'String',
  userImage: 'String',
  content: 'String',
  date: { type: Date, default: Date.now }
})
