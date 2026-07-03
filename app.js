const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./User"); // if your file is User.js in main folder

const app = express();
const PORT = 5000;

// ========================
// MIDDLEWARE
// ========================

// To read form data from HTML
app.use(express.urlencoded({ extended: true }));

// Serve frontend files (HTML, CSS)
app.use(express.static(path.join(__dirname, "public")));

// ========================
// MONGODB CONNECTION
// ========================
mongoose.connect("mongodb://salonibhakte_db_user:5ntHsoh32yNS5qr7@ac-qf7exfi-shard-00-00.utlj2ir.mongodb.net:27017,ac-qf7exfi-shard-00-01.utlj2ir.mongodb.net:27017,ac-qf7exfi-shard-00-02.utlj2ir.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ycw7u-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Error:", err));

// ========================
// ROUTES
// ========================

// Home route (optional if using public/index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST route for form submission
app.post("/register", async (req, res) => {
    try {
        console.log("FORM DATA RECEIVED:", req.body);

        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            address: req.body.address
        });

        await user.save();

        console.log("DATA SAVED SUCCESSFULLY");

        res.send("Registration Successful!");

    } catch (err) {
        console.log("ERROR OCCURRED:");
        console.log(err);

        res.send("Error saving data");
    }
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});