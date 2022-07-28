import React, { useState } from "react";
import Graph from "./components/Graph";
import "./App.css";

const matrix = new Array(50);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(50).fill(0);
}

function App() {
  const [graph, setGraph] = useState(matrix);

  return (
    <div className="App">
      <Graph graph={graph} setGraph={setGraph} />
    </div>
  );
}

export default App;
