const express = require("express"); // Import Express
const app = express(); // Create the express module
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Confirmation of server running successfully
