/*
Problem 1: Multiples of 3 and 5

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below the provided parameter value number.
*/

function multiplesOf3and5(number) {
    const maxDivisor = (multiple) => number % multiple === 0 ? number - number % multiple - multiple: number - number % multiple;
    const sumOfN = (multiple) => (maxDivisor(multiple) + multiple) * maxDivisor(multiple) / (multiple * 2);
    return sumOfN(5) + sumOfN(3) - sumOfN(3 * 5);
}