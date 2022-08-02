function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
            [array[i + 1], array[i]] = [array[i], array[i + 1]];
            i = -1;
        }
    }
    
    return array;
}