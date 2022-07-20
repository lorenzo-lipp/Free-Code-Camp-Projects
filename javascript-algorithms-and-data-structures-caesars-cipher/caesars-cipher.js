function rot13(str) {
    let strArr = str.split(" ");
    let decoded = "";

    for (let i in strArr) {
        for (let j in strArr[i]) {
            let code = strArr[i].charCodeAt(j) + 13;
            let codeStr = String.fromCharCode(code);
            if (code <= 90 && code >= 78) {
                decoded += codeStr;
            }
            else if (code <= 103 && code >= 78) {
                decoded += String.fromCharCode(code - 91 + 65);
            }
            else {
                decoded += strArr[i][j];
            }
        }
        if (i < strArr.length - 1) decoded += " ";
    }

    return decoded;
}

rot13("SERR PBQR PNZC");
rot13("SERR YBIR?");