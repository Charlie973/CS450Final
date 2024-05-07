import * as d3 from 'd3';
import Child1 from './child1';
import Child2 from './child2';
import './App.css';
import data from './SampleDataset.csv';

import React, { Component, useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(data).then(d => {
      setData(d);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="container">
        <div className="child">
          <h2>Child 1</h2>
          <Child1 data={data} />
        </div>
        <div className="child">
          <h2>Child 2</h2>
          <Child2 data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
