function palindrome(str) {
    let newStr = str.toLowerCase();
    newStr = newStr.split(/[\W_]+/g).join("");
    let reverseStr = newStr.split("").reverse().join("");
  
    return newStr === reverseStr;
  }
  
  palindrome("eye");