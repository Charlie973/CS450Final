// Child2.js

import * as d3 from 'd3';
import React, { Component, useEffect, useState } from "react";


const Child2 = ({ data }) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const [selectedCategory, setSelectedCategory] = useState('A');

  useEffect(() => {
    drawChart();
  }, [data, selectedCategory]);

  const drawChart = () => {
    const svg = d3.select("#chart2")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const categoryData = data.filter(d => d.category === selectedCategory);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(categoryData, d => d.x)])
      .nice()
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(categoryData, d => d.y)])
      .nice()
      .range([height, 0]);

    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg.selectAll(".dot")
      .data(categoryData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .on("mouseover", d => {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`x: ${d.x}<br/>y: ${d.y}`)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .call(d3.axisLeft(yScale));
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
      <div id="chart2"></div>
    </div>
  );
};

export default Child2;
