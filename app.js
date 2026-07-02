const express = require("express");
const path = require("path");

const app = express();
const PORT = 4000;

// Serve HTML + CSS + JS from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Required route (must be plain text)
app.get("/contact", (req, res) => {
  res.type("text/plain");
  res.send("salonibhakte@gmail.com");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});