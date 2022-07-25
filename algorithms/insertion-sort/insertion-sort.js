function insertionSort(array) {
    loopArray:
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < i; j++) {
            if (array[i] < array[j]) {
                array = [...array.slice(0, j), array[i], ...array.slice(j, i), ...array.slice(i + 1)];
                continue loopArray;
            }
        }
    }

    return array;
}