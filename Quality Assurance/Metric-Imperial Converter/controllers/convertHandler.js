function ConvertHandler() {
  
  this.getNum = function(input) {
    console.log(input)
    let result = input.substring(0, input.match(/[A-Za-z]/).index);
    if (result == "") return 1;
    let stringNum = result.split('/');
    if (stringNum.length == 2) {
      result = parseFloat(stringNum[0]) / parseFloat(stringNum[1]);
    } else if (stringNum.length == 1) {
      result = parseFloat(stringNum[0]);
    } else {
      return 'invalid number';
    }
    return result;
  };
  
  this.getUnit = function(input) {
    console.log(input)
    let result = input.substring(input.match(/[A-Za-z]/).index).toLowerCase();
    let units = ["mi", "km", "l", "gal", "lbs", "kg"];
    if (!units.includes(result)) return 'invalid unit';
    if (result == "l") return "L";
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()) {
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit) {
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit.toLowerCase()) {
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }
    result = parseFloat(result.toFixed(5))
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
