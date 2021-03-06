fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').
then(response => response.json()).
then(data => {
  const w = 800;
  const h = 500;
  const padding = 60;
  const minX = d3.min(data["data"], d => parseInt(d[0].slice(0, 4)));
  const maxX = d3.max(data["data"], d => parseInt(d[0].slice(0, 4)));
  const xScale = d3.scaleLinear().
  domain([minX, maxX]).
  range([padding, w - padding]);
  const yScale = d3.scaleLinear().
  domain([0, d3.max(data["data"], d => d[1])]).
  range([h - padding, padding]);
  const TOOLTIP = d3.select('#graph').
  append('div').
  attr('id', 'tooltip').
  style('display', 'flex').
  style('position', 'absolute').
  style('opacity', 0).
  style('padding', '5px').
  style('border', 'solid').
  style('border-width', '2px').
  style('border-radius', '5px').
  style('background-color', 'white').
  style('text-align', 'center');

  d3.select('svg').
  append('text').
  attr('id', 'title').
  attr('x', (w - 305.44) / 2).
  attr('y', 50).
  style('font-size', '40px');

  d3.select('svg').
  append('text').
  attr('id', 'y-label').
  attr('x', (w - 39.2) / 2).
  attr('y', h - 20).
  style('font-size', '20px');

  d3.select('svg').
  append('text').
  attr('id', 'x-label').
  attr('x', 0).
  attr('y', (h - 40.02) / 2).
  style('font-size', '20px').
  style('transform', 'rotate(-90deg) translate(-266px, -214px)');
  document.getElementById('title').textContent = "United States GDP";
  document.getElementById('y-label').textContent = "Year";
  document.getElementById('x-label').textContent = "GDP";
  const mouseover = event => {
    TOOLTIP.style('opacity', 1);
  };
  const mousemove = event => {
    const target = d3.select(event.target);
    TOOLTIP.html(`Date: ${target.attr('data-date')}<br>GDP: ${target.attr('data-gdp')} Billion dollars`).
    attr('data-date', target.attr('data-date')).
    style("top", event.pageY - 25 + "px").
    style("left", event.pageX + 50 + "px");
  };
  const mouseleave = event => {
    TOOLTIP.style('opacity', 0);
  };
  d3.select('svg').
  selectAll('g').
  data(data["data"]).
  enter().
  append('rect').
  attr('height', v => h - padding - yScale(v[1])).
  attr('width', w / data["data"].length).
  attr('x', (v, i) => xScale(minX + i / 4)) // Come??ar em 0
  .attr('y', v => yScale(v[1])).
  attr('class', 'bar').
  attr('data-date', d => d[0]).
  attr('data-gdp', d => d[1]).
  on('mouseover', mouseover).
  on('mousemove', mousemove).
  on('mouseleave', mouseleave);

  const yAxis = d3.axisLeft(yScale);
  d3.select('svg').
  append('g').
  attr('id', 'y-axis').
  attr('transform', 'translate(' + padding + ", 0)").
  call(yAxis);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  d3.select('svg').
  append('g').
  attr('id', 'x-axis').
  attr('transform', 'translate(0, ' + (h - padding) + ")").
  call(xAxis);
});