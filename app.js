const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const User = require("./User"); 

const app = express();
const PORT = 5000;
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("Connection Link")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
