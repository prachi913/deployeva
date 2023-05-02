const express = require("express");

const { Router } = require("express");
const { postmodel } = require("../model/postmodel");
const postroute = Router();

postroute.post("/create", async (req, res) => {
  try {
    const post = new postmodel(req.body);
    await post.save();
    res.send(post);
  } catch (error) {
    res.send({ err: err.message });
  }
});
postroute.get("/", async (req, res) => {
  try {
    const post = await postmodel.find({ authorid: req.body.authorid });

    res.send(post);
  } catch (error) {
    res.send({ err: err.message });
  }
});

postroute.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const post = await postmodel.findOne({ _id: id });
  try {
    if (req.body.authorid !== post.authorid) {
      res.send("you are not user");
    } else {
      const post = await postmodel.findByIdAndUpdate({ _id: id }, req.body);

      res.status(200).send({ msg: `posts updede id:${id} `, post });
    }
  
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

postroute.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const post = await postmodel.findOne({ _id: id });
  try {
    if (req.body.authorid !== post.authorid) {
      res.send("you are not user");
    } else {
      await postmodel.findByIdAndDelete({ _id: id });

      res.status(200).send({ msg: "deleted" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  postroute,
};
