import React, { useState } from "react";
import Graph from "./components/Graph";
import "./App.css";

let matrix = new Array(30);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(30).fill(0);
}

matrix[0][0] = 1;
// matrix[matrix.length - 1][matrix[0].length - 1] = 2;
matrix[20][15] = 2;

let visited = new Array(30);
for (let i = 0; i < visited.length; i++) {
  visited[i] = new Array(30).fill(false);
}
visited[0][0] = true;

function App() {
  const [graph, setGraph] = useState(matrix);

  //finds the ending node from the starting node and returns the indices of that node
  const startDFS = () => {
    const rootNode = [0, 0];
    const stack = [rootNode];
    while (stack.length > 0) {
      const current = stack.pop();
      let i = current[0];
      let j = current[1];
      if (graph[i][j] !== 1) {
        visited[i][j] = true;
      }
      if (graph[i][j] !== 1 && graph[i][j] !== 2) {
        graph[i][j] = 3;
        const node = document.getElementById(`${i},${j}`);
        node.classList.add("visited-node");
      }
      if (graph[i][j] === 2) {
        return [i, j];
      } else {
        if (i < graph.length - 1 && visited[i + 1][j] === false) stack.push([i + 1, j]);
        if (i > 0 && visited[i - 1][j] === false) stack.push([i - 1, j]);
        if (j > 0 && visited[i][j - 1] === false) stack.push([i, j - 1]);
        if (j < graph[i].length - 1 && visited[i][j + 1] === false) stack.push([i, j + 1]);
      }
    }
  };

  return (
    <div className="container">
      <nav className="nav">
        <h1 className="title">Algo Playground</h1>
      </nav>
      <button className="dfs-btn" onClick={startDFS}>
        Perform DFS
      </button>
      <Graph graph={graph} />
    </div>
  );
}

export default App;
