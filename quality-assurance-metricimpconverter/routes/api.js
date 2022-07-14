'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      res.type('text')
        .send('invalid number and unit');
    } else if (initNum == 'invalid number') {
      res.type('text')
        .send(initNum);
    } else if (initUnit == 'invalid unit') {
      res.type('text')
        .send(initUnit);
    }
    
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    console.log({initNum, initUnit, returnNum, returnUnit, string});
    res.json({initNum, initUnit, returnNum, returnUnit, string});
  })
  
};
