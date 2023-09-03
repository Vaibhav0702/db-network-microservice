
const mongoose = require('mongoose');

const mongoURl = process.env.MONGODB_URL

const connect = () => {
  return mongoose.connect(
    mongoURl
  );
};


module.exports = connect;