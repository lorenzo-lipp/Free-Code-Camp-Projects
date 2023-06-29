function convertToRoman(num) {
    let numerals = {1: "I", 5: "V", 10: "X", 50: "L", 100: "C", 500: "D", 1000: "M"};
    let roman = "";
    let arrNum = num.toString().split("").reverse();
    arrNum = arrNum.map(v => +v);
  
    if (numerals.hasOwnProperty(num)) return numerals[num];
    
    if (num < 4000) {
      for (let i = arrNum.length; i >= 0; i--) {
        if (arrNum[i] === 9) {
          roman += numerals[10 ** (i)] + numerals[10 ** (i + 1)];
        } else if (arrNum[i] <= 8 && arrNum[i] >= 5) {
          roman += numerals[5 * 10 ** (i)] + numerals[10 ** (i)].repeat(arrNum[i] - 5);
        } else if (arrNum[i] === 4) {
          roman += numerals[10 ** (i)] + numerals[(10 ** (i + 1)) * 0.5];
        } else if (arrNum[i] > 0) {
          roman += numerals[10 ** (i)].repeat(arrNum[i]);
        }
      }

      return roman;
    } 
  
    return "Number too long";
  }
  
  convertToRoman(4);