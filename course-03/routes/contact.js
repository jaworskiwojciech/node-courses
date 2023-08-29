const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    result: "I'm working!",
  });
});

router.post("/new", (req, res) => {
  res.status(201).json({
    result: "More stuff created!",
  });
});

module.exports = router;
