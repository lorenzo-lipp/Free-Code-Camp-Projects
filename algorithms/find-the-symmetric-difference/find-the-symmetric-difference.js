function sym(...args) {
    let symSet = new Set();

    for (let arg of args) {
        let notSym = new Set();
        let setArg = new Set(arg);

        for (let i of setArg) {
            if (symSet.has(i)) notSym.add(i);
            symSet.add(i);
        }

        for (let i of notSym) {
            symSet.delete(i);
        }
    }

    return [...symSet];
}
  
sym([1, 2, 3], [5, 2, 1, 4]);