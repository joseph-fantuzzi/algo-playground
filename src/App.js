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
  const [start, setStart] = useState([12, 6]);
  const [end, setEnd] = useState([12, 23]);
  const [values, setValues] = useState({ startX: 12, startY: 6, endX: 12, endY: 23 });

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

  const handleReset = () => {
    visited = new Array(30);
    for (let i = 0; i < visited.length; i++) {
      visited[i] = new Array(30).fill(false);
    }
    setVisitedGraph(visited);
    const nodes = document.querySelectorAll(".visited-node");
    nodes.forEach((node) => node.classList.remove("visited-node"));
  };

  const handleChange = () => {
    graph[start[0]][start[1]] = 0;
    graph[end[0]][end[1]] = 0;
    visitedGraph[start[0]][start[1]] = false;
    const { startX, startY, endX, endY } = values;
    setStart([Number(startX), Number(startY)]);
    setEnd([Number(endX), Number(endY)]);
    visitedGraph[startX][startY] = true;
  };

  return (
    <div className="container">
      <nav className="nav">
        <h1 className="title">Algo Playground</h1>
        <p className="info">A place to visualize different data structures and algorithms.</p>
      </nav>
      <div className="main">
        <div className="location-container">
          <div className="coordinates">
            <p className="node-title">Starting Node</p>
            <div className="inputs">
              <div>
                <label className="label" htmlFor="start-x">
                  X:
                </label>
                <input
                  className="input"
                  min="0"
                  max="29"
                  id="start-x"
                  name="startX"
                  type="number"
                  value={values.startX}
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="start-y">
                  Y:
                </label>
                <input
                  className="input"
                  min="0"
                  max="29"
                  id="start-y"
                  type="number"
                  value={values.startY}
                  name="startY"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="coordinates">
            <p className="node-title">Ending Node</p>
            <div className="inputs">
              <div>
                <label className="label" htmlFor="end-x">
                  X:
                </label>
                <input
                  className="input"
                  min="0"
                  max="29"
                  id="end-x"
                  type="number"
                  value={values.endX}
                  name="endX"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="end-y">
                  Y:
                </label>
                <input
                  className="input"
                  min="0"
                  max="29"
                  id="end-y"
                  type="number"
                  value={values.endY}
                  name="endY"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button className="change-btn" onClick={handleChange}>
            Change
          </button>
        </div>
        <div className="btn-container">
          <button className="dfs-btn" onClick={startDFS}>
            Depth First Search
          </button>
          <button className="bfs-btn" onClick={startBFS}>
            Breadth First Search
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
        <Graph graph={graph} />
      </div>
      <div className="footer">
        <p>Designed and Created By Joseph Fantuzzi 2022</p>
      </div>
    </div>
  );
}

export default App;
