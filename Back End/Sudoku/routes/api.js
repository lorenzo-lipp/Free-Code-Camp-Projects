'use strict';
const Sudoku = require('../controllers/sudoku.js');
const sudoku = new Sudoku();

module.exports = (app) => {
  app.route('/')
    .get((req, res) => res.json({}));
  app.route('/api/newgame')
    .get((req, res) => {
      let game = sudoku.newGame();
      let solution = sudoku.solve(game);
      res.json({ game, solution });
    });
  app.route('/api/solve/:gameString')
    .get((req, res) => {
      let isValid = sudoku.validate(req.params.gameString);
      if (isValid !== true) res.json(isValid);
      let solution = sudoku.solve(req.params.gameString)
      res.json(solution);
    });
}