function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (array[j - 1] <= array[j]) {
                break;
            }
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
        }
    }

    return array;
}