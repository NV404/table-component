import "./App.css";
import Table from "./components/table";

function App() {
  return (
    <Table
      header={[
        { key: "name", label: "Name" },
        { key: "age", label: "Age" },
      ]}
      rows={[
        { name: "Name1", age: 20},
        { name: "Name2", age: 23},
        { name: "Name5", age: 26},
        { name: "Name3", age: 24},
        { name: "Name4", age: 25},
      ]}
    />
  );
}

export default App;
