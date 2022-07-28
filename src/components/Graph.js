import React from "react";

const Graph = ({ graph }) => {
  return (
    <div className="grid-container">
      <div className="node-container">
        {graph.map((arr, i) => {
          return arr.map((elem, j) => {
            return (
              <div
                key={[i, j]}
                id={`${i},${j}`}
                className={`node ${elem === 1 && "start-node"} ${elem === 2 && "end-node"}`}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Graph;
