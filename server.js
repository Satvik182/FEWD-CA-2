require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.error(" MongoDB Connection Error:", err));

// Import movie routes
const movieRoutes = require("./routes/movies");

// Use routes
app.use("/movies", movieRoutes);

// Root Route
app.get("/", (req, res) => {
    res.send(" Welcome to the Movie Collection API!");
});

// Start server
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
});
