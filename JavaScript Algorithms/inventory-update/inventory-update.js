function updateInventory(arr1, arr2) {
    let items = new Set();
    let arr = arr1.concat(arr2);

    for (let item of arr) {
        items.add(item[1]);
    }

    items = [...items].sort();
    let inventory = [];

    for (let item of items) {
        inventory.push([0, item]);
    }

    for (let quantity of arr) {
        let index = inventory.findIndex(v => v[1] == quantity[1]);
        inventory[index][0] += quantity[0];
    }

    return inventory;
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);