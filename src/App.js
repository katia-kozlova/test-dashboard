
const { default: Dashboard } = require("./Dashboard");
var jsonData = require("./data.json");
const data = JSON.parse(JSON.stringify(jsonData));

function App() {
  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
