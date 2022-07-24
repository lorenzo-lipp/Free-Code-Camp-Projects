function pairwise(arr, arg) {
    let indicesSum = 0;
    let used = [];

    for (let i in arr) {
        for (let j in arr) {
            if (j <= i) continue;
            if (j in used || i in used) continue;
            if (arr[i] + arr[j] === arg) {
                indicesSum += (+i) + (+j);
                used.push(i, j);
            }
        }
    }

    return indicesSum;
}
  
  pairwise([1,4,2,3,0,5], 7); // 11