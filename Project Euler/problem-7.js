/* 
Problem 7: 10001st prime

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
What is the nth prime number?
*/

function nthPrime(n) {
    let primes = [2];
    let value = 3;
    const isPrime = (num) => {
        for (let prime of primes) {
            if (prime > num / 2) return true;
            if (num % prime === 0) return false;
        }
        return false;
    };

    while (primes.length < n) {
        if (isPrime(value)) primes.push(value);
        value += 2;
    }

    return primes[primes.length - 1];
}