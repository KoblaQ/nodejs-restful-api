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

// Render the homepage to the browser
app.get("/", (req, res) => {
  res.render("index");
});

// Set the folder for static files (css, jpg)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Confirmation of server running successfully
