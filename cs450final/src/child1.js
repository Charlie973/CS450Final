import React, { Component, useEffect, useState } from "react";

import * as d3 from "d3";

const Child1 = ({ data }) => {
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const svg = d3.select("#chart1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const categories = ['A', 'B', 'C'];

    const counts = categories.map(category => ({
      category,
      count: data.filter(d => d.category === category).length
    }));

    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, width])
      .paddingInner(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(counts, d => d.count)])
      .nice()
      .range([height, 0]);

    svg.selectAll(".bar")
      .data(counts)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.category))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(d.count))
      .attr("height", d => height - yScale(d.count))
      .attr("fill", "steelblue");

    svg.selectAll(".label")
      .data(counts)
      .enter().append("text")
      .attr("class", "label")
      .attr("x", d => xScale(d.category) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.count) - 5)
      .attr("text-anchor", "middle")
      .text(d => d.count);
  };

  return <div id="chart1"></div>;
};
export default Child1;
