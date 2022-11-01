const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/chat_db  ', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) console.log(err)
  else console.log('DB CONNECTED GOOD JOB FIVE STAR')
});

// Export connection
module.exports = mongoose.connection;