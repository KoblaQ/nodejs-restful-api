const express = require("express"); // Import Express
const exphbs = require("express-handlebars"); // Import Express-handlebars

const app = express(); // Create the express module

app.use(express.json()); // Get json from the client
app.use(express.urlencoded({ extended: false })); // Get from the url params

// Dummy database.
let users = [
  {
    id: 1,
    firstname: "Edem",
    lastname: "Quashigah",
    age: 32,
    ects: 108,
    enrollmentStatus: true,
    studentID: 123456,
  },
  {
    id: 2,
    firstname: "Pekka",
    lastname: "Kivisto",
    age: 43,
    ects: 44,
    enrollmentStatus: false,
    studentID: 457443,
  },
  {
    id: 3,
    firstname: "Antti",
    lastname: "Kankaanpaa",
    age: 55,
    ects: 88,
    enrollmentStatus: true,
    studentID: 98765,
  },
  {
    id: 4,
    firstname: "John",
    lastname: "Doe",
    age: 87,
    ects: 7,
    enrollmentStatus: false,
    studentID: 284628,
  },
  {
    id: 5,
    firstname: "Jane",
    lastname: "Doe",
    age: 32,
    ects: 210,
    enrollmentStatus: false,
    studentID: 396472,
  },
  {
    id: 6,
    firstname: "Harry",
    lastname: "Potter",
    age: 10,
    ects: 99,
    enrollmentStatus: true,
    studentID: 698564,
  },
];

// Specify default layout/ main template ie. 'main'
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars"); // Use handlebars as a template engine

// Render the homepage to the browser (Also set the title for that page)
app.get("/", (req, res) => {
  res.render("index", {
    title: "Simple RESTful API",
    products: users,
  });
});

app.get("/users", (req, res) => {
  res.render("users", {
    title: "Users Page",
    products: users,
  });
});

// Set the folder for static files (css, jpg)
app.use(express.static("public"));

// // Error message for if the web page cannot be found
// app.use((req, res, next) => {
//   //   res.status(404).send("Sorry, this content does not exist");
//   res.status(404).render("404", {
//     title: "404",
//   });
// });

// CREATE ONE USER
app.post("/api/users", (req, res) => {
  const lastId = users[users.length - 1].id;
  const newId = lastId + 1;

  newUser = {
    id: newId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    ects: req.body.ects,
    enrollmentStatus: req.body.enrollmentStatus,
    studentID: req.body.studentID,
  };

  users.push(newUser);

  res.location("localhost:5000/api/users/" + newId);
  res.status(201).json(newUser);
});

// READ all USERS
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET ONE USER by ID
app.get("/api/users/:id", (req, res) => {
  const userID = Number(req.params.id);

  const user = users.find((user) => user.id === userID);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      msg: "Not found!",
    });
  }
});

// UPDATE USER INFO
app.patch("/api/users/:id", (req, res) => {
  const idToUpdate = Number(req.params.id);
  const newAge = Number(req.body.age);
  const newEcts = Number(req.body.ects);
  const newEnrollmentStatus = req.body.enrollmentStatus;

  // Loop through each value and update the necessary one
  users.forEach((user) => {
    if (user.id === idToUpdate) {
      //   user.firstname = newFirstName;
      //   user.lastname = newLastName;
      user.age = newAge;
      user.ects = newEcts;
      user.enrollmentStatus = newEnrollmentStatus;
    }
  });

  // Check for the product with the ID
  const user = users.find((user) => user.id === idToUpdate);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(200).json({
      msg: "Sorry, could not find this user",
    });
  }
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
  const userID = Number(req.params.id);
  // Check if we have the a product with the id
  const user = users.find((user) => user.id === userID);
  if (user) {
    // cars = cars.filter(car => car.id != idToRemove);
    users = users.filter((user) => user.id !== userID);
    res.status(204).json({
      id: userID,
    });
  } else {
    res.status(404).json({
      msg: "Could not find the user",
    });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Confirmation of server running successfully
