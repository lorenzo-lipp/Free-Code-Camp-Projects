function quickSort(array) {
    let pivot = array[0];
    let biggerThanPivot = [];
    let smallerThanPivot = [];
    let equalToPivot = [];

    for (let i of array) {
        if (i < pivot) {
            smallerThanPivot.push(i);
        } else if (i > pivot) {
            biggerThanPivot.push(i);
        } else {
            equalToPivot.push(i);
        }
    }

    if (smallerThanPivot.length > 1) {
        smallerThanPivot = quickSort(smallerThanPivot);
    }
    if (biggerThanPivot.length > 1) {
        biggerThanPivot = quickSort(biggerThanPivot);
    }

    array = [...smallerThanPivot, ...equalToPivot, ...biggerThanPivot];

    return array;
}

quickSort([5,26,1,2,3,1]);