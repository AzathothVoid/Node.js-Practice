const promise1 = new Promise((resolve, reject) => {
  console.log("First");
  setTimeout(function onSetTimeout() {
    console.log("in Promise 1 Timeout");
    resolve(123);
  }, 2000);
});

const callback = function (data) {
  console.log("Recieved from the first promise: " + data);
  return new Promise(function (resolve, reject) {
    console.log("Second");
    setTimeout(function onSetTimeout() {
      console.log("In promise 2 timeout");
      resolve(456);
    }, 20);
  });
};

promise1.then(callback).then(function (data) {
  console.log("Recieved from the second promise: " + data);
});

//Using promises, making asynchronous database CRUD operations synchronous
//to use results of one operation for another
var promise = new Promise((resolve, reject) => {
  Person.findOne({ favoriteFoods: "Daal" }, function (err, data) {
    console.log(data);
    p_id = data._id;
    console.log("Value of P_ID: " + p_id);
    resolve(data);
  });
});

promise.then(function (data) {
  Person.findById(p_id, function (err, data) {
    if (err) {
      return console.log("Error Fetching Person By ID");
    }
    console.log(data);
  });
});
