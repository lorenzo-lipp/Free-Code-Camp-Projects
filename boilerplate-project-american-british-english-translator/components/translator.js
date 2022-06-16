const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const britishWords = Object.values(americanToBritishSpelling);
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishTitles = Object.values(americanToBritishTitles);
const britishOnly = require('./british-only.js');
const tagOpen = '<span class="highlight">';
const tagClose = "</span>";

class Translator {  
  translate(text, locale) {
    let spelling;
    let finalText = "";
    
    if (text === undefined || locale === undefined) {return { error: 'Required field(s) missing' };}
    if (!text) {return { error: 'No text to translate' };}
    
    switch(locale) {
      case "american-to-british":
        spelling = americanOnly;
        break;
      case "british-to-american":
        spelling = britishOnly;
        break;
      default:
        return { error: 'Invalid value for locale field' };
    }

    let textWords = text.split(/[\.\!\?\,\s\:]+/);
    let parsedWords = [];
    let pointIndexes = [...text.matchAll(/[\s\.\!\?\:\,]+/g)];
    for (let i = 0; i < textWords.length; i++) {
      let lower = textWords[i].toLowerCase();
      if (spelling[lower]) {
        parsedWords.push(tagOpen + spelling[lower] + tagClose);
      } else if (locale === "american-to-british") {
        if (americanToBritishSpelling[lower]) {
          parsedWords.push(tagOpen + americanToBritishSpelling[lower] + tagClose);
        } else if (americanToBritishTitles[lower + "."]) {
          parsedWords.push(tagOpen + americanToBritishTitles[lower + "."].slice(0, 1).toUpperCase() + americanToBritishTitles[lower + "."].slice(1) + tagClose + " ");
        } else {
          parsedWords.push(textWords[i]);
        }
      } else {
        if (britishWords.includes(lower)) {
          for (let key in americanToBritishSpelling) {
            if (americanToBritishSpelling[key] === lower) {
              parsedWords.push(tagOpen + key + tagClose);
            }
          }
        } else if (britishTitles.includes(lower)) {
          for (let key in americanToBritishTitles) {
            if (americanToBritishTitles[key] === lower) {
              parsedWords.push(tagOpen + key.slice(0, 1).toUpperCase() + key.slice(1) + tagClose);
            }
          }
        } else {
          parsedWords.push(textWords[i]);
        }
      }
    }

    while(parsedWords.length || pointIndexes.length) {
      if (parsedWords.length) {
        finalText += parsedWords[0];
        parsedWords.shift();
      }
      if (pointIndexes.length) {
        if (finalText[finalText.length - 1] != " ") {
          finalText += pointIndexes[0][0];
        }
        pointIndexes.shift();
      }
    }

    let times;
    let temporaryText;
    
    if (locale === "american-to-british") {
      temporaryText = finalText.split(/\d\d?\:\d\d/g);
      times = [...finalText.matchAll(/\d\d?\:\d\d/g)];
      for (let i = 0; i < times.length; i++) {
        times[i] = tagOpen + times[i][0].split(":").join(".") + tagClose;
      }
    } else {
      temporaryText = finalText.split(/\d\d?\.\d\d/g);
      times = [...finalText.matchAll(/\d\d?\.\d\d/g)];
      for (let i = 0; i < times.length; i++) {
        times[i] = tagOpen + times[i][0].split(".").join(":") + tagClose;
      }
    }

    finalText = "";

    while(temporaryText.length || times.length) {
      if (temporaryText.length) {
        finalText += temporaryText[0];
        temporaryText.shift();
      }
      if (times.length) {
        finalText += times[0];
        times.shift();
      }
    }

    for (let key in spelling) {
      if (key.includes(" ")) {
        if (finalText.toLowerCase().includes(key)) {
          let index = finalText.toLowerCase().indexOf(key);
          let charBefore = finalText.charCodeAt(index - 1);
          let charAfter = finalText.charCodeAt(index + key.length);
          if (!(charBefore >= 97 && charBefore <= 122) && !(charBefore >= 65 && charBefore <= 90) && charBefore && charBefore != 45) {
            if (!(charAfter >= 97 && charAfter <= 122) && !(charAfter >= 65 && charAfter <= 90) && charAfter && charAfter != 45) {
              console.log(key);
              finalText = finalText.slice(0, index) + tagOpen + spelling[key] + tagClose + finalText.slice(index + key.length);
            }
          }
        }
      }
    }

    return finalText;
    
  }
  
}

module.exports = Translator;