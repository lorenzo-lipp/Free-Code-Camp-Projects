fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferencedata/master/cyclist-data.json')
    .then(response => response.json())
    .then(renderData);

function fixCodes(code) {
  switch (code) {
    case "GER": return "DEU";
    case "DEN": return "DNK";
    case "SUI": return "CHE";
    case "POR": return "PRT";
    default: return code;
  }
}

function renderData(data) {
  const w = 800;
  const h = 600;
  const padding = 60;
  const parseTime = d => parseInt(d["Time"].split(':')[0]) * 60 + parseInt(d["Time"].split(':')[1]);
  const [minX, maxX] = d3.extent(data, d => parseInt(d["Year"]));
  const [minY, maxY] = d3.extent(data, parseTime);
  const svg = d3.select('svg');
  const negativeDoppingColor = "rgb(255 201 0)";
  const positiveDoppingColor = "#ef476f";
  
  const yScale = d3.scaleLinear()
    .domain([maxY + 10, minY - 10])
    .range([h - padding, padding]);
  const xScale = d3.scaleLinear()
    .domain([minX - 1, maxX + 1])
    .range([padding, w - padding]);
  
  const yAxis = d3.axisLeft(yScale).tickFormat(d => Math.floor(d / 60) + ":" + (d % 60 == 0 ? "00" : d % 60));
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  const TOOLTIP = d3.select('#graph')
    .append('div')
    .attr('id', 'tooltip');
  
  const mouseover = () => TOOLTIP.style('display', 'unset');
  const mouseleave = () => TOOLTIP.style('display', 'none');
  const mousemove = (event) => {
    const target = d3.select(event.target);

    TOOLTIP.html(`
      <p class="name">${target.attr('name')}</p>
      <img src="https://countryflagsapi.com/png/${fixCodes(target.attr('nation'))}">
      <p class="time">${target.attr('data-xvalue')} - ${target.attr('time')}</p>
      <p class="details">${target.attr('doping') ? target.attr('doping') : "No dopping allegations"}</p>
    `).attr('data-year', target.attr('data-xvalue'))
      .style("top", (event.pageY + 30)+"px")
      .style("left", event.pageX +"px")
      .style("transform", "translate(-50%, 0)");
  }

  svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + padding + ", 0)")
    .call(yAxis);

  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0, ' + (h - padding) + ")")
    .call(xAxis);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(parseInt(d["Year"])))
    .attr('cy', d => yScale(parseTime(d)))
    .attr('data-xvalue', d => parseInt(d["Year"]))
    .attr('data-yvalue', d => {
      const time = d["Time"].split(':')
      return new Date(1970, 0, 1, 0, time[0], time[1]);
    })
    .attr('time', d => d["Time"])
    .attr('name', d => d["Name"])
    .attr('nation', d => d["Nationality"])
    .attr('doping', d => d["Doping"])
    .attr('r', '7px')
    .style('fill', d => d["Doping"] !== "" ? positiveDoppingColor : negativeDoppingColor)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave);

  svg.append('text')
    .attr('id', 'title')
    .text("Doping in Professional Bicycle Racing")
    .style('font-size', '26px')
    .style('font-family', 'Open Sans')
    .attr('x', (w - d3.select('#title').node().getBBox().width) / 2)
    .attr('y', padding - 26);
  
  svg.append('g')
    .attr('id', 'legend')
    .append('rect')
    .attr('x', w - 225)
    .attr('y', h - 5 * padding)
    .attr('width', '15px')
    .attr('height', '15px')
    .attr('fill', positiveDoppingColor)
    .attr('stroke', 'black')
    .attr('stroke-width', '1px');

  const legend = d3.select("#legend");

  legend.append('rect')
    .attr('x', w - 225)
    .attr('y', h - 5 * padding + 20)
    .attr('width', '15px')
    .attr('height', '15px')
    .attr('fill', negativeDoppingColor)
    .attr('stroke', 'black')
    .attr('stroke-width', '1px')
  
  legend.append('text')
    .attr('x', w - 205)
    .attr('y', h - 5 * padding + 12)
    .style('font-family', 'Open Sans')
    .style('font-size', '11px')
    .text("Riders with positive dopping allegations");

  legend.append('text')
    .attr('x', w - 205)
    .attr('y', h - 5 * padding + 34)
    .style('font-family', 'Open Sans')
    .style('font-size', '14px')
    .text("No dopping allegations");
}


