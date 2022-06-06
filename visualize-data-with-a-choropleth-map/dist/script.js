const MAP = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
const EDUCATION = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
const COLORS = [
'rgb(183, 209, 255)',
'rgb(141, 175, 255)',
'rgb(93, 126, 255)',
'rgb(36, 56, 255)',
'rgb(32, 0, 255)',
'rgb(32, 0, 163)',
'rgb(29, 0, 102)'];


Promise.all([d3.json(MAP), d3.json(EDUCATION)]).
then(([dataMap, dataEducation]) => {
  //document.getElementById('map').innerHTML = JSON.stringify(dataEducation)
  const w = 1000;
  const h = 600;
  const path = d3.geoPath();
  const legendScale = d3.scaleLinear().
  domain([3, 66]).
  range([631, 841]);
  const legend = [3, 12, 21, 30, 39, 48, 57, 66];
  const legendAxis = d3.axisBottom(legendScale).tickFormat(d => d + "%").tickValues(legend);
  const TOOLTIP = d3.select('#map').
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
  const mouseover = event => {
    TOOLTIP.style('opacity', 1);
    d3.select(event.target).raise().style('stroke-width', '1px');
  };
  const mousemove = event => {
    const target = d3.select(event.target);
    TOOLTIP.html(`
            ${target.attr('data-area')}, ${target.attr('data-state')}: ${target.attr('data-education')}%`).
    attr('data-education', target.attr('data-education')).
    style("top", event.pageY - 25 + "px").
    style("left", event.pageX + 50 + "px");
  };
  const mouseleave = event => {
    TOOLTIP.style('opacity', 0);
    d3.select(event.target).style('stroke-width', '0px');
  };
  d3.select('svg').
  append('g').
  selectAll('path').
  data(topojson.feature(dataMap, dataMap.objects.counties).features).
  enter().
  append('path').
  attr('d', path).
  attr('class', 'county').
  attr('data-fips', d => d.id).
  attr('data-education', d => {
    let obj = dataEducation.filter(e => e.fips == d.id);
    return obj[0] ? obj[0].bachelorsOrHigher : 'No data';
  }).
  attr('data-area', d => {
    let obj = dataEducation.filter(e => e.fips == d.id);
    return obj[0] ? obj[0].area_name : '';
  }).
  attr('data-state', d => {
    let obj = dataEducation.filter(e => e.fips == d.id);
    return obj[0] ? obj[0].state : '';
  }).
  attr('fill', d => {
    let obj = dataEducation.filter(e => e.fips == d.id);
    return obj[0] ? setColor(obj[0]) : 'gray';
  }).
  style('stroke', 'white').
  style('stroke-width', '0px').
  on('mouseover', mouseover).
  on('mousemove', mousemove).
  on('mouseleave', mouseleave);

  d3.select('svg').
  append('text').
  attr('id', 'title').
  text('United States Educational Attainment').
  style('font-size', '26px').
  attr('x', (w - d3.select('#title').node().getBBox().width) / 2).
  attr('y', 30);

  d3.select('svg').
  append('text').
  attr('id', 'description').
  text(`Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)`).
  style('font-size', '14px').
  attr('x', (w - d3.select('#description').node().getBBox().width) / 2).
  attr('y', 44);

  d3.select('svg').
  append('g').
  attr('id', 'legend').
  selectAll('rect').
  data(COLORS).
  enter().
  append('rect').
  attr('fill', (d, i) => COLORS[i]).
  attr('width', 30).
  attr('height', 15).
  attr('x', (d, i) => 631 + 30 * i).
  attr('y', 55);

  d3.select('#legend').
  append('g').
  attr('id', 'legend-axis').
  attr('transform', 'translate(0, ' + 70 + ")").
  call(legendAxis);
});

function setColor(obj) {
  if (obj.bachelorsOrHigher >= 57) {
    return COLORS[6];
  } else if (obj.bachelorsOrHigher >= 48) {
    return COLORS[5];
  } else if (obj.bachelorsOrHigher >= 39) {
    return COLORS[4];
  } else if (obj.bachelorsOrHigher >= 30) {
    return COLORS[3];
  } else if (obj.bachelorsOrHigher >= 21) {
    return COLORS[2];
  } else if (obj.bachelorsOrHigher >= 12) {
    return COLORS[1];
  } else {
    return COLORS[0];
  }
}