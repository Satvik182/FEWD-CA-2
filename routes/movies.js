const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Create a movie (POST)
router.post("/", async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all movies or a specific movie by ID (GET)
router.get("/:id?", async (req, res) => {
    try {
        const movies = req.params.id 
            ? await Movie.findById(req.params.id) 
            : await Movie.find();
        if (!movies) return res.status(404).json({ error: "Movie not found" });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a movie (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ error: "Movie not found" });
        res.json(updatedMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a movie (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ error: "Movie not found" });
        res.json({ message: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
