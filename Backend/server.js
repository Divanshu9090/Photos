// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/imagesDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

// Define a schema and model for storing image URLs
const imageSchema = new mongoose.Schema({
    imageUrl: String,
});

const Image = mongoose.model("Image", imageSchema);

// Route to save the image URL to the database
app.post("/upload", async (req, res) => {
    const { imageUrl } = req.body;
    const newImage = new Image({ imageUrl });

    try {
        await newImage.save();
        res.status(201).send({ message: "Image URL saved successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Error saving image URL" });
    }
});

// Route to get all images from the database
app.get("/images", async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).send({ message: "Error fetching images" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
