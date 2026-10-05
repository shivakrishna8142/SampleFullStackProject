const express = require("express");
const movieslist = require("../models/movies");

const router = express.Router();

router.get("/api/v1/movies", async (req, res) => {

    const mov = await movieslist.find({
         runtime: { $lt: 2 }
    });
    res.status(200).json({
        status: "success",
        results: mov.length,
        data:mov
        
    });
});

module.exports = router;