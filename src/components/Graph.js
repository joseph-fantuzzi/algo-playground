import React from "react";

const Graph = ({ graph, setGraph }) => {
  return (
    <div className="node-container">
      {graph.map((arr) => {
        return arr.map((elem, j) => {
          return <div key={j} className="node"></div>;
        });
      })}
    </div>
  );
};

export default Graph;
