/* 
Problem 4: Largest palindrome product

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two n-digit numbers.
*/

function largestPalindromeProduct(n) {
    let maxNum = Math.pow(10, n) - 1;
    let minNum = maxNum - Math.pow(10, n - 1);
    let factorOne = maxNum - maxNum % 11;
    let factorTwo = maxNum;
    const isPalindrome = (num) => num.toString() === [...num.toString()].reverse().join('');
    let largestPalindrome = 0;

    while(factorOne > minNum) {
        let product = factorOne * factorTwo;
        let isLarger = product > largestPalindrome;
        if (isLarger && isPalindrome(product)) {
            largestPalindrome = product
        }
        if (!isLarger || factorTwo < minNum) {
            factorOne -= 11;
            factorTwo = maxNum;
        } else {
            factorTwo -= 2;
        }
    }

    return largestPalindrome || undefined;
}