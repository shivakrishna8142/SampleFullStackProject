const express = require("express");
const movieslist = require("../models/movies");

const router = express.Router();

router.post("/api/v1/addmovies", async (req, res) => {
  try {
    
    const movie = await movieslist.create({
      year: req.body.year,
      title: req.body.title
    });

    res.status(201).json({
      status: "success",
      data: movie
    });

  } catch (error) {

    res.status(500).json({
      status: "failed",
      message: error.message
    });

  }
});
module.exports = router;