const express = require("express");
const movieslist = require("../models/movies");

const router = express.Router();

router.patch("/api/v1/tours/:id", async (req, res) => {
    const mov = await movieslist.find();

    const str = req.params.id;
    const t_id = Number(str.replace(/:/g, ''));

    if (t_id > tours.length) {
        return res.status(400).json({
            status: 'failed',
            results: "invalid ID"
        })
    }

    const t = mov.find(el => el.id === t_id);

    if (req.body) {
        t.name = req.body.name;
    }

    res.status(200).json({
        status: 'sucess',
        data: {
            data: t
        }
    })
});

module.exports = router;