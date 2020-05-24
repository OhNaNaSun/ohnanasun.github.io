>Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

>Example:
```
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
```
>Explanation: [4,-1,2,1] has the largest sum = 6.

>Follow up:
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
### Approach #1: Brute force
```
var maxSubArray = function(nums) {
    let maxSum = -Infinity
    for(let i=0; i < nums.length; i++){
        let iMaxSum = nums[i]
        let iSum = nums[i]
        for(let j=i+1;j<nums.length;j++){
            iSum += nums[j]
            iMaxSum = Math.max(iMaxSum, iSum)
        }
        maxSum = Math.max(iMaxSum, maxSum)
    }
    return maxSum
};
```
* Time complexity : O(n^2)
* Space complexity : O(1)

### Approach #2: DP
Explanation: [Max Contiguous Subarray Sum - Cubic Time To Kadane's Algorithm ("Maximum Subarray" on LeetCode)](https://www.youtube.com/watch?v=2MmGzdiKR9Y&t=516s)
```
var maxSubArray = function(nums) {
  var maxSum = nums[0];
  var sum = nums[0];
  for (var i = 1; i < nums.length; i++) {
    sum = Math.max(sum + nums[i], nums[i]);
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
};
``` 
OR
```
 var maxSubArray = function(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
  }
  return Math.max(...nums)
};
```
* Time complexity : O(n)
* Space complexity : O(1)

### Approach #3: divide and conquer(DAC) 
Explanation: [Divide & Conquer — Commented Explanation and Big-O (JS)](https://leetcode.com/problems/maximum-subarray/discuss/364839/Divide-and-Conquer-Commented-Explanation-and-Big-O-(JS))
```
var maxSubArray = function(nums) {
  const findMaxSum = (arr) => {
      if(arr.length === 1){
          return arr[0]
      }
      if(!arr.length){
          return -Infinity
      }
      let maxLSum = -Infinity
      let maxRSum = -Infinity
      const mid = Math.floor(arr.length/2)
      const n = arr.length
      maxLSum = Math.max(maxLSum, findMaxSum(arr.slice(0, mid)))
      maxRSum = Math.max(maxRSum, findMaxSum(arr.slice(mid+1, n+1)))
      let LmaxMidSum = 0
      let RmaxMidSum = 0
      for(let i=mid-1,contiSum=0; i>=0;i--){
          contiSum += arr[i]
          LmaxMidSum = Math.max(contiSum, LmaxMidSum)
      }
      for(let i=mid+1,contiSum=0; i<n;i++){
          contiSum += arr[i]
          RmaxMidSum = Math.max(contiSum, RmaxMidSum)
      }
      return Math.max(maxLSum, maxRSum,LmaxMidSum+ arr[mid] + RmaxMidSum)
  }
  return findMaxSum(nums)
};
```
* Time complexity : O(nLgn)
* Space complexity : O(1)