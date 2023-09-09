const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var userSchema = new Schema({

   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
   },
   deleted_at: {
      type: Date,
      default: null
   },
   password: {
      type: String,
   }

})


var User = mongoose.model("user", userSchema);

module.exports = User;