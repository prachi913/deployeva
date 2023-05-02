const mongoose = require("mongoose");

const usershema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  gender: { type: String, require: true },
});

const usermodel = mongoose.model("user", usershema);

module.exports = {
  usermodel,
};
