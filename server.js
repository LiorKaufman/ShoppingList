// backend dependecies
const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const path = require("path");

const items = require("./routes/api/items");

const app = express();

// Bodyparser Middleware
app.use(bodyParse.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Use routes
app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
