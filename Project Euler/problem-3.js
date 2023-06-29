/* 
Problem 3: Largest prime factor

The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the given number?
*/

function largestPrimeFactor(number) {
    const primeFactors = [];
    let primeFactorsProd = 1;
    let n = 1;
    if (number % 2 === 0) primeFactors.push(2);

    while(true) {
        let len = primeFactors.length
        n += 2;
        if (number % n === 0) {
            let isPrime = null;
            for (let i = 0; i < len; i++) {
                if (n % primeFactors[i] === 0) {
                    isPrime = false;
                    break;
                }
            }

            if (isPrime !== false) {
                primeFactors.push(n);
                primeFactorsProd *= n;
            }
        }
        if (n >= number / primeFactorsProd) break;
    }

    return primeFactors[primeFactors.length - 1];
}