const VIDEO_GAMES = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';
const MOVIES = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';
const KICKSTARTER = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json';
const DIAGRAM = [
"0, 0, 800, 800",
"800, 0, 800, 800",
"1600, 0, 800, 800"];

const COLORS = [
'#e6194B',
'#f58231',
'#ffe119',
'#FF2400',
'#3cb44b',
'#4363d8',
'#911eb4',
'#469990',
'#bfef45',
'#9A6324',
'#42d4f4',
'#f032e6',
'#003151',
'#B1560F',
'#00A86B',
'#fabed4',
'#dcbeff',
'#aaffc3'];


Promise.all([d3.json(VIDEO_GAMES), d3.json(MOVIES), d3.json(KICKSTARTER)]).
then(([dataGames, dataMovies, dataKick]) => {
  const w = 800;
  const h = 600;
  const rootGames = d3.hierarchy(dataGames).
  sum(d => d.value).
  sort((a, b) => b.value - a.value);
  const rootMovies = d3.hierarchy(dataMovies).
  sum(d => d.value).
  sort((a, b) => b.value - a.value);
  const rootKick = d3.hierarchy(dataKick).
  sum(d => d.value).
  sort((a, b) => b.value - a.value);
  const treemapGames = d3.treemap().
  size([w, h]).
  paddingInner(2).
  paddingOuter(0.5)(
  rootGames);
  const treemapMovies = d3.treemap().
  size([w, h]).
  paddingInner(2).
  paddingOuter(0.5)(
  rootMovies);
  const treemapKick = d3.treemap().
  size([w, h]).
  paddingInner(2).
  paddingOuter(0.5)(
  rootKick);
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
  const mouseover = event => {
    TOOLTIP.style('opacity', 1);
    d3.select(event.target).style('stroke-width', '0px');
  };
  const mousemove = event => {
    const target = d3.select(event.target);
    TOOLTIP.html(`${target.attr('data-name')}
                    <br>
                    Category: ${target.attr('data-category')}
                    <br>
                    Value: ${target.attr('data-value')}`).
    attr('data-value', target.attr('data-value')).
    style("top", event.pageY - 25 + "px").
    style("left", event.pageX + 50 + "px");
  };
  const mouseleave = event => {
    TOOLTIP.style('opacity', 0);
    d3.select(event.target).style('stroke-width', '1px');
  };
  const appendRect = (element, offset = 0, elementClass = 'tile', enterData = dataGames) => {
    element.append('rect').
    attr('x', d => d.x0 + offset).
    attr('y', d => d.y0 + 150).
    attr('width', d => d.x1 - d.x0).
    attr('height', d => d.y1 - d.y0).
    attr('class', elementClass).
    attr('data-name', d => d.data.name).
    attr('data-category', d => d.data.category).
    attr('data-value', d => d.value).
    style('stroke', 'black').
    style('fill', d => COLORS[enterData.children.findIndex(v => v.name === d.parent.data.name)]).
    on('mouseover', mouseover).
    on('mousemove', mousemove).
    on('mouseleave', mouseleave);
  };
  const appendText = (element, offset = 0) => {
    element.append('foreignObject').
    attr('width', d => d.x1 - d.x0).
    attr('height', d => d.y1 - d.y0).
    attr('x', d => d.x0 + offset).
    attr('y', d => d.y0 + 150).
    style('text-align', 'center').
    style('padding', '2px').
    style('pointer-events', 'none').
    append("xhtml:p").
    html(d => d.data.name).
    style('font-size', '12px').
    style('font-weight', 'bold').
    style('color', 'black').
    style('display', 'inline');
  };
  const appendLegend = (element, offset = 0, space_between = 60, elementClass = 'legend-item') => {
    element.append('rect').
    attr('x', (d, i) => {
      const row = Math.floor(i / 3);
      return 240 + row * space_between + offset;
    }).
    attr('y', (d, i) => {
      const column = i % 3;
      return 65 + column * 30;
    }).
    attr('class', elementClass).
    attr('width', 15).
    attr('height', 15).
    style('fill', (d, i) => COLORS[i]).
    style('stroke', 'black').
    style('stroke-width', '1px');
  };
  const appendLegendText = (element, offset = 0, space_between = 60) => {
    element.append('text').
    attr('x', (d, i) => {
      const row = Math.floor(i / 3);
      return 240 + row * space_between + 20 + offset;
    }).
    attr('y', (d, i) => {
      const column = i % 3;
      return 65 + column * 30 + 12;
    }).
    text(d => d.name).
    style('font-size', '16px');
  };

  let gamesSVG = d3.select('svg').
  selectAll('.tile').
  data(rootGames.leaves());

  let gamesG = gamesSVG.enter().
  append('g');

  appendRect(gamesG);
  appendText(gamesG);


  let moviesSVG = d3.select('svg').
  selectAll('.tile-movie').
  data(rootMovies.leaves());
  let moviesG = moviesSVG.enter().
  append('g');

  appendRect(moviesG, w, 'tile-movies', dataMovies);
  appendText(moviesG, w);

  let kickSVG = d3.select('svg').
  selectAll('.tile-kickstarter').
  data(rootKick.leaves());

  let kickG = kickSVG.enter().
  append('g');

  appendRect(kickG, 2 * w, 'tile-kickstarter', dataKick);
  appendText(kickG, 2 * w);

  d3.select('svg').
  append('text').
  text('Video Game Sales').
  style('font-size', '34px').
  attr('id', 'title').
  attr('x', (w - d3.select('#title').node().getBBox().width) / 2).
  attr('y', 34);
  d3.select('svg').
  append('text').
  text('Top 100 most sold games grouped by platform').
  style('font-size', '20px').
  attr('id', 'description').
  attr('x', (w - d3.select('#description').node().getBBox().width) / 2).
  attr('y', 54);
  d3.select('svg').
  append('text').
  text('Movie Sales').
  style('font-size', '34px').
  attr('id', 'title-movies').
  attr('x', (w - d3.select('#title-movies').node().getBBox().width) / 2 + w).
  attr('y', 34);
  d3.select('svg').
  append('text').
  text('Most sold movies grouped by genre').
  style('font-size', '20px').
  attr('id', 'description-movies').
  attr('x', (w - d3.select('#description-movies').node().getBBox().width) / 2 + w).
  attr('y', 54);
  d3.select('svg').
  append('text').
  text('Kickstarter Pledges').
  style('font-size', '34px').
  attr('id', 'title-kick').
  attr('x', (w - d3.select('#title-kick').node().getBBox().width) / 2 + 2 * w).
  attr('y', 34);
  d3.select('svg').
  append('text').
  text('Most pledged Kickstarter campaigns grouped by type').
  style('font-size', '20px').
  attr('id', 'description-kick').
  attr('x', (w - d3.select('#description-kick').node().getBBox().width) / 2 + 2 * w).
  attr('y', 54);


  let legendGames = d3.select('svg').
  append('g').
  attr('id', 'legend').
  selectAll('rect').
  data(dataGames.children);

  let legendGamesG = legendGames.enter().
  append('g');

  appendLegend(legendGamesG, -20);
  appendLegendText(legendGamesG, -20);

  let legendMovies = d3.select('svg').
  append('g').
  attr('id', 'legend-movies').
  selectAll('rect').
  data(dataMovies.children);

  let legendMoviesG = legendMovies.enter().
  append('g');

  appendLegend(legendMoviesG, w + 30, 90, 'legend-item-movies');
  appendLegendText(legendMoviesG, w + 30, 90);

  let legendKick = d3.select('svg').
  append('g').
  attr('id', 'legend-kickstarter').
  selectAll('rect').
  data(dataKick.children);

  let legendKickG = legendKick.enter().
  append('g');

  appendLegend(legendKickG, 2 * w - 230, 140, 'legend-item-kick');
  appendLegendText(legendKickG, 2 * w - 230, 140);


});

function changeDiagram(num) {
  d3.select('svg').
  attr('viewBox', DIAGRAM[num]);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('video-games-button').addEventListener('click', function () {
    changeDiagram(0);
  });
  document.getElementById('movies-button').addEventListener('click', function () {
    changeDiagram(1);
  });
  document.getElementById('kickstarter-button').addEventListener('click', function () {
    changeDiagram(2);
  });
});