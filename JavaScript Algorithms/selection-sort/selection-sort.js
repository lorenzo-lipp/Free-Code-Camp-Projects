function selectionSort(array) {
    for (let n = 0; n < array.length; n++) {
        let min = array[n];
        let index = n;
        for (let i = n + 1; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
                index = i;
            }
        }
        let temp = [array[n], array[index]];

        array[n] = temp[1];
        array[index] = temp[0];
    }

    return array;
}