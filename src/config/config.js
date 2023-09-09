
const mongoose = require('mongoose');

const mongoURl = process.env.MONGODB_URL

const connect = () => {
  return mongoose.connect(
    mongoURl,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};


module.exports = connect;