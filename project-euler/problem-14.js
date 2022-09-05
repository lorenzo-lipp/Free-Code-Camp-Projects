/* 
Problem 14: Longest Collatz sequence

The following iterative sequence is defined for the set of positive integers:
n → n/2 (n is even)
n → 3n + 1 (n is odd)
Using the rule above and starting with 13, we generate the following sequence:
13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1
It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.
Which starting number, under the given limit, produces the longest chain?
Note: Once the chain starts the terms are allowed to go above limit.
*/

function longestCollatzSequence(limit) {
    let longestSequence;
    let longestSequenceTerms = 1;

    for (let i = 2; i < limit; i++) {
        let num = i;
        let terms = 0;

        while(num !== 1) {
            if (num % 2 === 1) num = 3 * num + 1;
            else num /= 2;
            terms++;
        }

        if (terms > longestSequenceTerms) {
            longestSequence = i;
            longestSequenceTerms = terms;
        }
    }

    return longestSequence;
}