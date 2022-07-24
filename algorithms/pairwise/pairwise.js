function pairwise(arr, arg) {
    let indicesSum = 0;

    for (let i in arr) {
        for (let j in arr) {
            if (j <= i) continue;
            if (arr[i] + arr[j] === arg) {
                indicesSum += (+i) + (+j);
                arr[i] = NaN;
                arr[j] = NaN;
            }
        }
    }

    return indicesSum;
}
  
  pairwise([1,4,2,3,0,5], 7); // 11