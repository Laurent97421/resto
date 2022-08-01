var mongoose = require("mongoose");

var usersSchema = mongoose.Schema({
  userName: String,
  userFirstName: String,
  userEmail: String,
  userPhone: String,
  userPassword: String,
  token: String,
  reservations: [reservationsSchema],
});

var userModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
