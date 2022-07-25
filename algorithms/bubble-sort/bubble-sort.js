function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i + 1]) {
            let temp = [array[i], array[i + 1]];
            array[i + 1] = temp[0];
            array[i] = temp[1];
            i = -1;
            continue;
        }
    }
    
    return array;
}