const { forEach, select } = require("async");
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
  { name: "Uzair", favoriteFoods: ["Samosa", "Lobiya"] },
  { name: "Saqib", favoriteFoods: ["Haldy", "Lobiya"] },
  { name: "Basit", favoriteFoods: ["Samosa", "Daal"] },
  { name: "Roland", favoriteFoods: ["Samosa", "Kabab"] },
];
var p_id;

//functions
const createAndSavePerson = (person, done) => {
  new Person(person).save(function (err, data) {
    if (err) {
      return console.log("Error Fetching Person By ID");
    }
    console.log(`Successfully Created Person ${data.name}` + data);
  });
};

const createManyPeople = (arrayOfPeople) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      return console.log("Error Creating People");
    }
    console.log(`Successfully Created People\n` + data);
  });
};

const findPeopleByName = (personName, callback) => {
  Person.find(personName, function (err, data) {
    console.log(`Successfully updated ${personName}\n` + data);

    if (callback) callback(data);
  });
};

const findOneByFood = async (food) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    console.log(`Successfully Found ${data.name}\n` + data);
  });
};

const findPersonById = async (personID, callback) => {
  Person.findById(personID, function (err, data) {
    if (err) {
      return console.log("Error Fetching Person By ID");
    }
    console.log(`Successfully Found ${data.name}\n` + data);

    if (callback) callback(data);
  });
};

const findEditThenSave = (personID) => {
  findPersonById(personID, function (data) {
    if (!data.favoriteFoods.includes("hamburger")) {
      data.favoriteFoods.push("hamburger");
    }
    data.save();
  });
};

const findAndUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    function (err, data) {
      console.log(`Successfully updated ${personName}\n` + data);
    }
  );
};

const removeById = (personID) => {
  Person.findOneAndDelete({ _id: personID }, function (err, data) {
    console.log(`Successfully deleted ${data.name}\n` + data);
  });
};

const removeManyPeople = (nameToRemove) => {
  Person.deleteMany({ name: nameToRemove }, function (err, response) {
    if (err) return console.log(err);

    console.log(
      `Successfully deleted records with name ${nameToRemove}\n` + response
    );
  });
};

const queryChain = (foodToSearch) => {
  var findQuery = Person.find({ favoriteFoods: foodToSearch });
  var sortQuery = findQuery.sort("name");
  var limitQuery = sortQuery.limit(2);
  var selectQuery = limitQuery.select("-age");

  selectQuery.exec(function (err, response) {
    if (err) return console.log(err);

    console.log(`Successfull Chaining!\n` + response);
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

//findEditThenSave("64be16b06059be25e4f308e9");
//removeManyPeople("Basit");

queryChain("Samosa");

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
