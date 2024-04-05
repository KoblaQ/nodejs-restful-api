const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars

const app = express(); // Create the express module

// Specify default layout/ main template ie. 'main'
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars"); // Use handlebars as a template engine

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Confirmation of server running successfully
