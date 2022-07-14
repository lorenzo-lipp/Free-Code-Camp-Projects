const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input.', function () {
    assert.strictEqual(convertHandler.getNum("157lbs"), 157);
  });
  test('convertHandler should correctly read a decimal number input.', function () {
    assert.strictEqual(convertHandler.getNum("1.57kg"), 1.57);
  });
  test('convertHandler should correctly read a fractional input.', function () {
    assert.strictEqual(convertHandler.getNum("1/4l"), 0.25);
  });
  test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.strictEqual(convertHandler.getNum("1.5/2km"), 0.75);
  });
  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.strictEqual(convertHandler.getNum("3/2/3gal"), 'invalid number');
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.strictEqual(convertHandler.getNum("km"), 1);
  });
  test('convertHandler should correctly read each valid input unit.', function () {
    assert.strictEqual(convertHandler.getUnit("15km"), 'km');
    assert.strictEqual(convertHandler.getUnit("15mi"), 'mi');
    assert.strictEqual(convertHandler.getUnit("15l"), 'L');
    assert.strictEqual(convertHandler.getUnit("15gal"), 'gal');
    assert.strictEqual(convertHandler.getUnit("15lbs"), 'lbs');
    assert.strictEqual(convertHandler.getUnit("15kg"), 'kg');
  });
  test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.strictEqual(convertHandler.getUnit("15birds"), 'invalid unit');
  });
  test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.strictEqual(convertHandler.getReturnUnit("km"), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit("mi"), 'km');
    assert.strictEqual(convertHandler.getReturnUnit("L"), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit("gal"), 'L');
    assert.strictEqual(convertHandler.getReturnUnit("kg"), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit("lbs"), 'kg');
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.strictEqual(convertHandler.spellOutUnit("lbs"), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit("L"), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit("km"), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit("gal"), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit("kg"), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit("mi"), 'miles');
  });
  test('convertHandler should correctly convert gal to L.', function () {
    assert.strictEqual(convertHandler.convert(2, "gal"), 7.57082);
  });
  test('convertHandler should correctly convert L to gal.', function () {
    assert.strictEqual(convertHandler.convert(3, "L"), 0.79252);
  });
  test('convertHandler should correctly convert mi to km.', function () {
    assert.strictEqual(convertHandler.convert(2, "mi"), 3.21868);
  });
  test('convertHandler should correctly convert km to mi.', function () {
    assert.strictEqual(convertHandler.convert(3, "km"), 1.86412);
  });
  test('convertHandler should correctly convert lbs to kg.', function () {
    assert.strictEqual(convertHandler.convert(2, "lbs"), 0.90718);
  });
  test('convertHandler should correctly convert kg to lbs.', function () {
    assert.strictEqual(convertHandler.convert(3, "kg"), 6.61387);
  });
  
});