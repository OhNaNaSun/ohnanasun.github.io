### Description
>Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

>Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
```
Example 1:
Given nums = [1,1,2],
Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

It doesn't matter what you leave beyond the returned length.
```
```
Example 2:

Given nums = [0,0,1,1,1,2,2,3,3,4],

Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

**It doesn't matter what values are set beyond the returned length.**
```
### Approach 1: Two Pointers
```
var removeDuplicates = function(nums) {
    if (nums.length == 0) return 0
    let i = 0
    for (let j = i; j < nums.length; j++) {
      if (nums[j] !== nums[i]) {
          nums[++i] = nums[j]
      }
    }
    return i+1;
};
```
* Time complextiy : O(n). Assume that nn is the length of array. Each of i and j traverses at most n steps.

* Space complexity : O(1).
### Approach 2: Use splice
```
var removeDuplicates = function(nums) {
  for (var i = 0; i < nums.length; i++) {
    if (nums[i + 1] === nums[i]) {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};
```
* Time complextiy : O(n). 
* Space complexity : O(1).
