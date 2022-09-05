/*
Problem 15: Lattice paths

Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
https://cdn-media-1.freecodecamp.org/project-euler/1Atixoj.gif - a diagram of 6 2 by 2 grids showing all the routes to the bottom right corner
How many such routes are there through a given gridSize?
*/

function latticePaths(gridSize) {
    function factorial(n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
    }

    return factorial(2 * gridSize) / Math.pow(factorial(gridSize), 2);
}