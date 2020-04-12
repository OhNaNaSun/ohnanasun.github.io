## Description
> Write a function that reverses a string. The input string is given as an array of characters char[].
Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
You may assume all the characters consist of printable ascii characters.

## My solutions
### 1. JavaScript Array has this reverse method, yayy!

```
var reverseString = function(s) {
    return s.reverse() 
};
```

### 2. Very traditional solution
```
var reverseString = function(s) {
    var n = s.length
    for(var i = 0; i < n/2; i++){
        var temp = s[i]
        s[i] = s[n-i-1]
        s[n-i-1] = temp
    }
    return s
};
```
### 3. Neat and brilliant!
Please try to use ES6 new features!
```
var reverseString = function(s) {
    for(let[i, j] = [0, s.length-1]; i < j; i++, j--){
       [s[i], s[j]] = [s[j], s[i]] 
    }
    return s
};
```
## I got a related problem: **How do you swap two integers without using a temporary variable?**
I saw this problem when I was reading this article: [50+ Data Structure and Algorithms Interview Questions for Programmers](https://medium.com/hackernoon/50-data-structure-and-algorithms-interview-questions-for-programmers-b4b1ac61f5b0). It's a shame that I had no idea when I saw it🙃. I didn't even ever think about it, all I always do is create a variable named `temp` for swapping everything🤣.
### Solution 1 - Using Arithmetic Operators
> The idea is to get sum in one of the two given numbers. The numbers can then be swapped using the sum and subtraction from sum. Also we can use multiplication and division.

Brilliant!💅
```
var swapInterger = function([a, b]) {
    a = a + b
    b = a - b
    a = a - b 
    return [a, b]
}
```
### Solution 2 - Using Bitwise XOR
> The bitwise XOR operator can be used to swap two variables. The XOR of two numbers x and y returns a number which has all the bits as 1 wherever bits of x and y differ. For example XOR of 10 (In Binary 1010) and 5 (In Binary 0101) is 1111 and XOR of 7 (0111) and 5 (0101) is (0010).

Real Smile 🙂
```
var swapInterger = function([a, b]) {
    a = a^b
    b = a^b
    a = a^b
    return [a, b]
};
```
See more about these solutions: [How to swap two numbers without using a temporary variable?](https://www.geeksforgeeks.org/swap-two-numbers-without-using-temporary-variable/)

### Cheers!