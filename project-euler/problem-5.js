/* 
Problem 5: Smallest multiple

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to n? 
*/

function smallestMult(n) {
    let primeFactors = [];
    let mult = 1;

    for (let i = 2; i <= n; i++) {
        let nextPrime = i;
        for (let prime of primeFactors) {
            if (nextPrime % prime === 0) nextPrime /= prime;
        }
        if (nextPrime !== 1) {
            primeFactors.push(nextPrime);
            mult *= nextPrime;
        }
    }

    return mult;
}