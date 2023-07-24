var express = require("express");
var mongoose = require("mongoose");
require("dotenv").config();

var app = express();

const port = 3001;

// connecting with mongoDB and setting up database connections
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("Database connected!");
  })
  .catch(function (err) {
    console.error("Database Connection Error");
  });

//setting up schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: { type: Number, default: 18 },
  favoriteFoods: [String],
});

//creating model
const Person = mongoose.model("Person", personSchema);

//initializing model instance
let james = new Person({
  name: "James Charles",
});

//displaying model data
app.use(function (req, res) {
  res.json(james.name);
});

//creating dummy objects and function parameter data
var dummy = { name: "nauman", age: 20, favoriteFoods: ["Samosa", "Daal Mash"] };
var arr = [
  { name: "nauman", favoriteFoods: ["Samosa", "Lobiya"] },
  { name: "Azam", favoriteFoods: ["Pakora", "Lobiya"] },
  { name: "Salahuddin", favoriteFoods: ["Samosa", "Daal"] },
];
var p_id;

//functions
const createAndSavePerson = (person, done) => {
  new Person(person).save(function (err, data) {});
};

const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople);
};

const findPeopleByName = (personName) => {
  Person.find(personName, function (err, data) {
    console.log(data);
  });
};

const findOneByFood = async (food) => {
  Person.findOne(food, function (err, data) {
    console.log(data);
    p_id = data._id;
    console.log("Value of P_ID: " + p_id);
    return data;
  });
};

const findPersonById = async (personID, callback) => {
  Person.findById(personID, function (err, data) {
    if (err) {
      return console.log("Error Fetching Person By ID");
    }
    console.log(data);

    if (callback) callback(data);
  });
};

const findEditThenSave = (personID) => {
  findPersonById(personID, function (data) {
    console.log(data);
  });
};
//function calls
// createAndSavePerson(dummy);
//createManyPeople(arr);
//findPeopleByName({ age: 18 });

// findOneByFood({ favoriteFoods: "Daal" })
//   .then((result) => {
//     findPersonById(p_id);
//   })
//   .catch((err) => console.error("HELLLOOO" + err));

// const promise = findOneByFood({ favoriteFoods: "Daal" });
// promise.then(function (result) {
//   return findPersonById(p_id);
// });

// var callback = new Promise((resolve, reject) => {
//   Person.findById(personID, function (err, data) {
//     if (err) {
//       return console.log("Error Fetching Person By ID");
//     }
//     console.log(data);
//   });
// });

findEditThenSave("64be16b06059be25e4f308e9");

app.listen(port);

exports.PersonModel = Person;

// callback chaining methods to achieve synchronous pairing of two functions
const findOneByFood1 = (food) => {
  Person.findOne(food, function (err, data) {
    findPersonById(data._id, findPeopleByName({ name: "Azam" }));
  });
};

const findPersonById2 = (personID) => {
  Person.findById(personID, function (err, data) {
    if (err) {
      return console.log("Error Fetching Person By ID");
    }
    console.log(data);
  });
};
