/* 
Problem 9: Special Pythagorean triplet

A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,
a² + b² = c²
For example, 3² + 4² = 9 + 16 = 25 = 5².
There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc such that a + b + c = n.
*/

function specialPythagoreanTriplet(n) {
    let c = Math.ceil(n / 3) + 1;
    let b = c - 1;
    let a = n - b - c;

    while(Math.pow(a, 2) + Math.pow(b, 2) !== Math.pow(c, 2)) {
        if (c > n - 3) return undefined;
        if (a >= b) {
            c++;
            b = c - 1;
            a = n - b - c;
            continue;
        }
        b--;
        a++;
    }

    return a * b * c;
}