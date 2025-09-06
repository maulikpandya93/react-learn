const root = ReactDOM.createRoot(document.getElementById('root'));


const firstHeader = React.createElement("h1", {}, "Hello World!");
const secondHeader = React.createElement("h2", {}, "Second Header");
const element = React.createElement("div", {}, firstHeader, secondHeader);
root.render(element);