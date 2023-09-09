const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var userSchema = new Schema({

   username: {
      type: String,
      required: true
   },
   number:{
      type :Number,
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
      required: true,
   }
},
   {
      timestamps: true,
      versionKey: false,
   })


var User = mongoose.model("user", userSchema);

module.exports = User;