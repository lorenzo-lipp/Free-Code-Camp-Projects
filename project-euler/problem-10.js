/*
Problem 10: Summation of primes

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
Find the sum of all the primes below n.
*/

function primeSummation(n) {
    if (n <= 2) return 0;
    let oddPrimes = [];
    let value = 3;
    const isPrime = (num) => {
        let max = Math.sqrt(num);
        for (let prime of oddPrimes) {
            if (prime > max) return true;
            if (num % prime === 0) return false;
        }
        return true;
    }

    while (value < n) {
        if (isPrime(value)) oddPrimes.push(value);
        value += 2;
    }

    return (oddPrimes.length ? oddPrimes.reduce((a, b) => a + b) : 0) + 2;
}