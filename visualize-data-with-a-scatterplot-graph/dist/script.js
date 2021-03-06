var globalData;

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferencedata/master/cyclist-data.json').
then(response => response.json()).
then(data => {
  globalData = data;
  construct(globalData);
});

function construct(data) {
  const w = parseInt(d3.select('svg').style('width'));
  const h = 600;
  const padding = 60;
  const minX = d3.min(data, d => parseInt(d["Year"]));
  const maxX = d3.max(data, d => parseInt(d["Year"]));
  const minY = d3.min(data, d => parseInt(d["Time"].split(':')[0]) * 60 + parseInt(d["Time"].split(':')[1]));
  const maxY = d3.max(data, d => parseInt(d["Time"].split(':')[0]) * 60 + parseInt(d["Time"].split(':')[1]));
  const yScale = d3.scaleLinear().
  domain([maxY + 10, minY - 10]).
  range([h - padding, padding]);
  const xScale = d3.scaleLinear().
  domain([minX - 1, maxX + 1]).
  range([padding, w - padding]);
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
  const yAxis = d3.axisLeft(yScale).tickFormat(d => Math.floor(d / 60) + ":" + (d % 60 == 0 ? "00" : d % 60));
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const mouseover = event => {
    TOOLTIP.style('opacity', 1);
  };
  const mousemove = event => {
    const target = d3.select(event.target);
    TOOLTIP.html(`Name: ${target.attr('name')} - ${target.attr('nation')}
      <br>
      Year: ${target.attr('data-xvalue')} - Time: ${target.attr('time')}
      <br>
      Doping: ${target.attr('doping') == "" ? "NO" : "YES"}`).
    attr('data-year', target.attr('data-xvalue')).
    style("top", event.pageY - 25 + "px").
    style("left", event.pageX + 50 + "px");
  };
  const mouseleave = event => {
    TOOLTIP.style('opacity', 0);
  };

  d3.select('svg').
  append('g').
  attr('id', 'y-axis').
  attr('transform', 'translate(' + padding + ", 0)").
  call(yAxis);

  d3.select('svg').
  append('g').
  attr('id', 'x-axis').
  attr('transform', 'translate(0, ' + (h - padding) + ")").
  call(xAxis);

  d3.select('svg').
  selectAll('circle').
  data(data).
  enter().
  append('circle').
  attr('class', 'dot').
  attr('cx', (d) =>
  xScale(parseInt(d["Year"]))).

  attr('cy', (d) =>
  yScale(parseInt(d["Time"].split(':')[0]) * 60 + parseInt(d["Time"].split(':')[1]))).

  attr('data-xvalue', (d) =>
  parseInt(d["Year"])).

  attr('data-yvalue', d => {
    parsedTime = d["Time"].split(':');
    return new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
  }).

  attr('time', d => d["Time"]).
  attr('name', d => d["Name"]).
  attr('nation', d => d["Nationality"]).
  attr('doping', d => d["Doping"]).
  attr('r', '7px').
  style('fill', d => d["Doping"] != "" ? 'royalblue' : 'orange').
  style('stroke', 'black').
  style('stroke-width', '1px').
  style('opacity', '80%').
  on('mouseover', mouseover).
  on('mousemove', mousemove).
  on('mouseleave', mouseleave);

  d3.select('svg').
  append('text').
  attr('id', 'title').
  text("Doping in Professional Bicycle Racing").
  style('font-size', '26px').
  attr('x', (w - d3.select('#title').node().getBBox().width) / 2).
  attr('y', padding - 26);


  d3.select('svg').
  append('g').
  attr('id', 'legend').
  append('rect').
  attr('x', w - 225).
  attr('y', h - 5 * padding).
  attr('width', '15px').
  attr('height', '15px').
  attr('fill', 'royalblue').
  attr('stroke', 'black').
  attr('stroke-width', '1px');

  d3.select('#legend').
  append('rect').
  attr('x', w - 225).
  attr('y', h - 5 * padding + 20).
  attr('width', '15px').
  attr('height', '15px').
  attr('fill', 'orange').
  attr('stroke', 'black').
  attr('stroke-width', '1px');

  d3.select('#legend').
  append('text').
  attr('x', w - 205).
  attr('y', h - 5 * padding + 13).
  style('font-size', '12px').
  text("No dopping allegations");
  d3.select('#legend').
  append('text').
  attr('x', w - 205).
  attr('y', h - 5 * padding + 31).
  style('font-size', '10px').
  text("Riders with positive dopping allegations");


  TOOLTIP.style('display', 'flex').
  style('position', 'absolute').
  style('opacity', 0).
  style('padding', '8px').
  style('border', 'solid').
  style('border-width', '2px').
  style('border-radius', '5px').
  style('background-color', 'white').
  style('text-align', 'center');
}