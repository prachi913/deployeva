const mongoose = require("mongoose");

const postschem = mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  device: { type: String, jj: ["PC", "TABLET", "MOBILE"], require: true },
  authorid: { type: String, require: true },
});

const postmodel = mongoose.model("post", postschem);

module.exports = {
  postmodel,
};
