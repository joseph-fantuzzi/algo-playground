import React, { useState } from "react";
import Graph from "./components/Graph";
import "./App.css";

let matrix = new Array(30);
for (let i = 0; i < matrix.length; i++) {
  matrix[i] = new Array(30).fill(0);
}

let visited = new Array(30);
for (let i = 0; i < visited.length; i++) {
  visited[i] = new Array(30).fill(false);
}

function App() {
  const [graph, setGraph] = useState(matrix);
  const [visitedGraph, setVisitedGraph] = useState(visited);
  const [start, setStart] = useState([7, 5]);
  const [end, setEnd] = useState([10, 10]);

  graph[start[0]][start[1]] = 1;
  graph[end[0]][end[1]] = 2;
  visitedGraph[start[0]][start[1]] = true;

  //Depth First Search
  const startDFS = () => {
    let animationDelay = 0;
    const rootNode = start;
    const stack = [rootNode];
    while (stack.length > 0) {
      const current = stack.pop();
      animationDelay++;
      let i = current[0];
      let j = current[1];
      if (graph[i][j] !== 1) {
        visited[i][j] = true;
      }
      if (graph[i][j] !== 1 && graph[i][j] !== 2) {
        const node = document.getElementById(`${i},${j}`);
        setTimeout(() => {
          node.classList.add("visited-node");
        }, 20 * animationDelay);
      }
      if (graph[i][j] === 2) {
        return [i, j];
      } else {
        if (i > 0 && visited[i - 1][j] === false) stack.push([i - 1, j]);
        if (i < graph.length - 1 && visited[i + 1][j] === false) stack.push([i + 1, j]);
        if (j > 0 && visited[i][j - 1] === false) stack.push([i, j - 1]);
        if (j < graph[i].length - 1 && visited[i][j + 1] === false) stack.push([i, j + 1]);
      }
    }
  };

  //Breadth First Search
  const startBFS = () => {
    let animationDelay = 0;
    const rootNode = start;
    const queue = [rootNode];
    while (queue.length > 0) {
      const current = queue.shift();
      animationDelay++;
      let i = current[0];
      let j = current[1];
      if (graph[i][j] !== 1) {
        visited[i][j] = true;
      }
      if (graph[i][j] !== 1 && graph[i][j] !== 2) {
        const node = document.getElementById(`${i},${j}`);
        setTimeout(() => {
          node.classList.add("visited-node");
        }, 20 * animationDelay);
      }
      if (graph[i][j] === 2) {
        return [i, j];
      } else {
        if (i > 0 && visited[i - 1][j] === false) {
          queue.push([i - 1, j]);
          visited[i - 1][j] = true;
        }
        if (i < graph.length - 1 && visited[i + 1][j] === false) {
          queue.push([i + 1, j]);
          visited[i + 1][j] = true;
        }
        if (j > 0 && visited[i][j - 1] === false) {
          queue.push([i, j - 1]);
          visited[i][j - 1] = true;
        }
        if (j < graph[i].length - 1 && visited[i][j + 1] === false) {
          queue.push([i, j + 1]);
          visited[i][j + 1] = true;
        }
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
      <button className="dfs-btn" onClick={startBFS}>
        Perform BFS
      </button>
      <Graph graph={graph} />
    </div>
  );
}

export default App;
