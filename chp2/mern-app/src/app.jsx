const continents = ['Africa', 'Antatica', 'Australia', 'Asia', 'Europe', 'North America', 'South America'];
const helloContinents = Array.from(continents, continent => `Hello ${continent}!`);
const message = helloContinents.join(' ');
const element = (
  <div title="Outer div">
     <h1 className="header">{message}</h1>
  </div>
);
ReactDOM.render(element, document.getElementById('content'));