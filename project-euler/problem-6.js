/*
Problem 6: Sum square difference

The sum of the squares of the first ten natural numbers is,
1² + 2² + ... + 10² = 385
The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)² = 55² = 3025
Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
Find the difference between the sum of the squares of the first n natural numbers and the square of the sum.
*/

function sumSquareDifference(n) {
    let difference = 0;

    for (let i = 1; i < n; i++) {
        for (let j = i + 1; j <= n; j++) {
            difference += i * j;
        }
    }

    return difference * 2;
}