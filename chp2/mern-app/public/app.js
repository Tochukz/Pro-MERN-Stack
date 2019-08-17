"use strict";

var continents = ['Africa', 'Antatica', 'Australia', 'Asia', 'Europe', 'North America', 'South America'];
var helloContinents = Array.from(continents, function (continent) {
  return "Hello ".concat(continent, "!");
});
var message = helloContinents.join(' ');
var element = React.createElement("div", {
  title: "Outer div"
}, React.createElement("h1", {
  className: "header"
}, message));
ReactDOM.render(element, document.getElementById('content'));