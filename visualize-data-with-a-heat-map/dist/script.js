var globalData;
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').
then(data => data.json()).
then(data => {
  globalData = data;
  construct(data);
});

function construct(data) {
  const w = parseInt(d3.select('svg').style('width'));
  const h = parseInt(d3.select('svg').style('width')) >= 1000 ? 600 : w * 0.6;
  const padding = 60;
  const minX = d3.min(data.monthlyVariance, d => d.year);
  const maxX = d3.max(data.monthlyVariance, d => d.year);
  const minY = 12;
  const maxY = 0;
  const yScale = d3.scaleLinear().
  domain([minY, maxY]).
  range([h - padding, padding]);
  const xScale = d3.scaleLinear().
  domain([minX - 1, maxX + 1]).
  range([padding, w - padding / 3]);
  const legendScale = d3.scaleLinear().
  domain([2.8, 12.8]).
  range([w / 2 - 112.5, w / 2 + 112.5]);
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
  const temperatures = [2.8, 3.9, 5, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];
  const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => months[Math.abs(i - 13)]);
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const legendAxis = d3.axisBottom(legendScale).tickFormat((d, i) => temperatures[i]).tickValues([2.8, 3.85, 4.95, 6.1, 7.2, 8.35, 9.45, 10.58, 11.7, 12.8]);
  const mouseover = event => {
    TOOLTIP.style('opacity', 1);
    d3.select(event.target).raise().style('stroke-width', '1px');
  };
  const mousemove = event => {
    const target = d3.select(event.target);
    TOOLTIP.html(`${target.attr('month')}, ${target.attr('data-year')}
            <br>
            ${target.attr('data-temp')} ??C
            <br>
            ${target.attr('variance')} ??C`).
    attr('data-year', target.attr('data-year')).
    style("top", event.pageY - 25 + "px").
    style("left", event.pageX + 50 + "px");
  };
  const mouseleave = event => {
    TOOLTIP.style('opacity', 0);
    d3.select(event.target).style('stroke-width', '0px');
  };
  const SVG = d3.select('svg');
  const COLORS = [
  'rgb(69, 117, 180)',
  'rgb(116, 173, 209)',
  'rgb(171, 217, 233)',
  'rgb(224, 243, 248)',
  'rgb(255, 255, 191)',
  'rgb(254, 224, 144)',
  'rgb(253, 174, 97)',
  'rgb(244, 109, 67)',
  'rgb(215, 48, 39)'];


  SVG.append('g').
  attr('id', 'y-axis').
  attr('transform', 'translate(' + padding + "," + (h - 2 * padding) / 24 + ")").
  call(yAxis);

  SVG.append('g').
  attr('id', 'x-axis').
  attr('transform', 'translate(0, ' + (h - padding) + ")").
  call(xAxis);

  SVG.selectAll('rect').
  data(data.monthlyVariance).
  enter().
  append('rect').
  attr('x', d => xScale(d.year)).
  attr('y', d => yScale(d.month - 1)).
  attr('width', w * 12 / data.monthlyVariance.length) // escala
  .attr('height', (h - 2 * padding) / 12) // escala
  .attr('fill', d => {
    if (data.baseTemperature + d.variance <= 3.9) {return COLORS[0];}
    if (data.baseTemperature + d.variance <= 5) {return COLORS[1];}
    if (data.baseTemperature + d.variance <= 6.1) {return COLORS[2];}
    if (data.baseTemperature + d.variance <= 7.2) {return COLORS[3];}
    if (data.baseTemperature + d.variance <= 8.3) {return COLORS[4];}
    if (data.baseTemperature + d.variance <= 9.5) {return COLORS[5];}
    if (data.baseTemperature + d.variance <= 10.6) {return COLORS[6];}
    if (data.baseTemperature + d.variance <= 11.7) {return COLORS[7];}
    if (data.baseTemperature + d.variance <= 12.8) {return COLORS[8];}
    return 'rgb(165, 0, 38)';
  }).
  attr('class', 'cell').
  attr('data-year', d => d.year).
  attr('month', d => months[d.month - 1]).
  attr('data-month', d => d.month - 1).
  attr('variance', d => Math.round(d.variance * 100) / 100).
  attr('data-temp', d => Math.round((data.baseTemperature + d.variance) * 100) / 100).
  style('stroke', 'black').
  style('stroke-width', '0px').
  on('mouseover', mouseover).
  on('mousemove', mousemove).
  on('mouseleave', mouseleave);

  SVG.append('g').
  attr('id', 'legend');

  SVG.select('#legend').
  selectAll('rect').
  data(COLORS).
  enter().
  append('rect').
  attr('fill', (d, i) => COLORS[i]).
  attr('width', 25).
  attr('height', 25).
  attr('x', (d, i) => (w - 225 + 50 * i) / 2).
  attr('y', h - padding / 2 - 12);

  SVG.select('#legend').
  append('g').
  attr('id', 'legend-axis').
  attr('transform', 'translate(0, ' + (h - padding / 2 + 13) + ")").
  call(legendAxis);

  SVG.append('text').
  attr('id', 'title').
  text("Monthly Global Land-Surface Temperature").
  style('font-size', '26px').
  attr('x', (w - d3.select('#title').node().getBBox().width) / 2).
  attr('y', 30);

  SVG.append('text').
  attr('id', 'description').
  text("1753 - 2015: base temperature 8.66???").
  style('font-size', '18px').
  attr('x', (w - d3.select('#description').node().getBBox().width) / 2).
  attr('y', 50);

  SVG.select('#y-axis .tick').remove();
  SVG.select('#y-axis .domain').
  attr('transform', 'translate(0, ' + -(h - 2 * padding) / 24 + ")");
}