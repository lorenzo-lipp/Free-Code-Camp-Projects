let globalData = null;
let selectedMin = 1947;
let selectedMax = 2015;
const w = 800;
const h = 500;

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    globalData = data;
    renderData(data);
  });

function renderData(data) {
  const padding = 60;
  const yLabelOffset = 20;
  const totalYears = 2015 - 1947 + 1;
  const totalSelectedYears = selectedMax - selectedMin + 1;
  const rectangleTotal = (w - padding * 2) / data["data"].length;
  const rectangleGap = rectangleTotal * 0.2 >= 3 ? Math.round(rectangleTotal * 0.2) : 0;
  const rectangleWidth = rectangleTotal - rectangleGap;
  const maxX = d3.max(data["data"], (d) => new Date(d[0]));
  const minX = d3.min(data["data"], (d) => new Date(d[0]));
  maxX.setMonth(maxX.getMonth() + 3);

  const xScale = d3.scaleTime()
    .domain([minX, maxX])
    .range([padding, w - padding]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data["data"], (d) => d[1])])
    .range([h - padding, padding])
    .nice();

  d3.select('#graph')
    .append('div')
    .attr('class', 'slider-background')
    .append('div')
    .attr('class', 'slider-progress')
    .style('width', `${(700 * totalSelectedYears / totalYears) - 10}px`)
    .style('left', `${((selectedMin - 1947) / totalYears) * 100}%`);

  d3.select('#graph')
    .append('input')
    .attr('class', 'slider')
    .attr('value', selectedMin)
    .attr('min', 1947)
    .attr('max', 2015)
    .attr('type', 'range')
    .on('change', (e) => {
      const value = +e.target.value;

      if (value < selectedMax - 1) {
        selectedMin = value;
        filterData();
      } else {
        selectedMin = selectedMax - 2;
        e.target.value = selectedMin;
        filterData();
      }
    });

  d3.select('#graph')
    .append('input')
    .attr('class', 'slider')
    .attr('value', selectedMax)
    .attr('min', 1947)
    .attr('max', 2015)
    .attr('type', 'range')
    .on('change', (e) => {
      const value = +e.target.value;

      if (value > selectedMin + 1) {
        selectedMax = value;
        filterData();
      } else {
        selectedMax = selectedMin + 2;
        e.target.value = selectedMax;
        filterData();
      }
    });

  d3.select('#graph')
    .append('div')
    .attr('class', 'slider-text')
    .style('left', `calc(50% + ${((selectedMin - 1947) / totalYears) * 690}px - 350px)`)
    .text(selectedMin);

  d3.select('#graph')
    .append('div')
    .attr('class', 'slider-text')
    .style('left', `calc(50% + ${-((2015 - selectedMax) / totalYears) * 690}px + 335px)`)
    .text(selectedMax);

  const tooltip = d3.select('#graph')
    .append('div')
    .attr('id', 'tooltip');

  d3.select('svg')
    .append('text')
    .attr('id', 'title')
    .attr('x', '50%')
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .text('United States GDP in billion dollars');

  d3.select('svg')
    .append('text')
    .attr('id', 'y-label')
    .attr('x', w / 2)
    .attr('y', h - yLabelOffset)
    .attr('text-anchor', 'middle')
    .text('Year');

  d3.select('svg')
    .append('text')
    .attr('id', 'x-label')
    .attr('x', 0)
    .attr('y', h / 2)
    .attr('text-anchor', 'middle')
    .text('GDP');

  const tooltipFormat = d3.timeFormat("%B %d, %Y")
  const mouseover = () => tooltip.style('display', 'flex');
  const mouseleave = () => tooltip.style('display', 'none');
  const mousemove = (event) => {
    const target = d3.select(event.target);
    const date = new Date(target.attr('data-date'));
    tooltip.html(`${tooltipFormat(new Date(date.toISOString().slice(0, 19)))}<br>${target.attr('data-gdp')} billion dollars`)
      .attr('data-date', target.attr('data-date'))
      .style("top", `${event.pageY + 50}px`);

    const tooltipWidth = tooltip.node().getBoundingClientRect().width;
    tooltip.style("left", `${event.pageX - tooltipWidth / 2}px`);
  }

  let lastRectPosition = padding - rectangleWidth;

  d3.select('svg')
    .selectAll('g')
    .data(data["data"])
    .enter()
    .append('rect')
    .attr('height', (v) => h - padding - yScale(v[1]))
    .attr('width', rectangleWidth)
    .attr('x', (v, i) => {
      if (rectangleGap) return xScale(new Date(v[0])) + rectangleGap / 2;
      const position = lastRectPosition + rectangleWidth;
      lastRectPosition = position;
      return position;
    })
    .attr('y', (v) => yScale(v[1]))
    .attr('class', 'bar')
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave);

  const yAxis = d3.axisLeft(yScale)
  d3.select('svg')
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + padding + ", 0)")
    .call(yAxis);

  const ticks = [];
  const xAxis = d3.axisBottom(xScale).tickFormat((d) => {
    const year = d.getFullYear();
    if (ticks.includes(year)) return "";
    ticks.push(year);
    return year;
  });

  d3.select('svg')
    .append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0, ' + (h - padding) + ")")
    .call(xAxis);
}

function filterData() {
  const isInsideInterval = (value) => value >= selectedMin && value <= selectedMax;
  const newData = {};

  newData.data = globalData.data.filter(v => isInsideInterval(+v[0].slice(0, 4)));

  clear();
  renderData(newData);
}

function clear() {
  d3.select('#graph').html('<svg width="800" height="500" viewBox="0 0 800 480"></svg>');
}

window.addEventListener('resize', () => {
  if (window.innerWidth < w) document.querySelector('main').style.transform = `scale(${(window.innerWidth - 20) / w})`;
  else document.querySelector('main').style.transform = '';
});

window.addEventListener('load', () => window.dispatchEvent(new Event('resize')));