> Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].
Example:
```
Input:  [1,2,3,4]
Output: [24,12,8,6]
```
>Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

>**(Note: Please solve it without division and in O(n).0**

>Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)
### Approach 1: Left and Right product lists
```
var productExceptSelf = function(nums) {
    var leftArr = []
    var rightArr = []
    leftArr[0] = 1
    rightArr[nums.length-1] = 1
    for(var i = 1; i < nums.length; i++) {
        leftArr[i] = leftArr[i-1] * nums[i-1]
        rightArr[nums.length-i]
    }
    for(var i = nums.length-2; i >=0 ;i--){
        rightArr[i] = rightArr[i+1] * nums[i+1]
    }
    return nums.map((item, index) => {
        return leftArr[index] * rightArr[index]
    })
};
```
OR faster
```
var productExceptSelf = function(nums) {
    var leftArr = []
    var rightArr = []
    leftArr[0] = 1
    rightArr[nums.length-1] = 1
    var j;
    for(var i = 1; i < nums.length; i++) {
        j = nums.length-1-i;
        leftArr[i] = leftArr[i-1] * nums[i-1]
        rightArr[j] = rightArr[j+1] * nums[j+1]
    }
    return nums.map((item, index) => {
        return leftArr[index] * rightArr[index]
    })
};
```
* Time complexity : O(N)
* Space complexity : O(N) used up by the two intermediate arrays that we constructed to keep track of product of elements to the left and right.

### Approach 2: O(1) space approach
```
const productExceptSelf = function(nums) {
    let output = Array(nums.length)
    let productsLeftOfMe = 1
    for(let i = 0; i < nums.length; i++){
        output[i] = productsLeftOfMe
        productsLeftOfMe *= nums[i]
    }
    let productsRightOfMe = 1
    for(let i = nums.length-1; i >= 0; i--){
        output[i] *= productsRightOfMe
        productsRightOfMe *= nums[i]
    }
    return output
};
```
OR use reduce
```
var productExceptSelf = function(nums) {
    const arr = Array(nums.length)
    nums.reduce((leftP, curr, index) => {
        arr[index] = leftP
        return leftP*=curr
    }, 1)
    nums.reduceRight((rightP, curr, index) => {
        arr[index] = rightP * arr[index] 
        return rightP*=curr 
    }, 1)
    return arr
}; 
```
* Time complexity : O(N)
* Space complexity : O(1) since don't use any additional array for our computations. The problem statement mentions that using the answer array doesn't add to the space complexity.


### Approach 3: slow but one line
```
var productExceptSelf = (nums) => nums.map((el, i, arr) => {
    el = arr.slice(); 
    el.splice(i, 1); 
    return el.reduce((prev, curr) => curr *= prev);
});
```
* Time complexity : O(N^2)
* Space complexity : O(N)  //?