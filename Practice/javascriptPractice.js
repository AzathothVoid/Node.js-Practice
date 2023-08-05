const { f1 } = require("./module");

f1();
(function () {
  console.log("enter");
  function hello() {
    console.log("Hello world");
  }

  hello();
})();

// (function () {
//   console.log(hello);
// })();

// (function () {})();

// mapper = function () {
//   function mapping() {
//     console.log("Mapping");
//   }
// };

// mapper.mapping();
