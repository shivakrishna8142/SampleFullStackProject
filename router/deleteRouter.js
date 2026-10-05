const express = require("express");
const movieslist = require("../models/movies");

const router = express.Router();

router.delete("/api/v1/movies/:id", async (req, res) => {
    try {
        const movie = await movieslist.findByIdAndDelete(req.params.id);

        if (!movie) {
            return res.status(404).json({
                status: "failed",
                message: "Movie not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Movie deleted successfully",
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