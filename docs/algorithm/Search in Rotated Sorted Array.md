### Description
>Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

>(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

>You are given a target value to search. If found in the array return its index, otherwise return -1.

>You may assume no duplicate exists in the array.Your algorithm's runtime complexity must be in the order of O(log n).
```
Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```
### Solution 1: One pass 
```
var search = function(nums, target) {
    let left = 0
    let right = nums.length-1
    while(right >= left){
        const middle = Math.floor((right+left)/2)
        if (nums[middle] === target) {
            return middle
        } else if(nums[left] <= nums[middle]){
            if(target >= nums[left] && target < nums[middle]){
                right = middle - 1
            } else {
                left = middle + 1
            }
        } else if(nums[middle] <= nums[right]) {
            if(target > nums[middle] && target <= nums[right]){
                left = middle + 1
            } else {
                right = middle - 1
            }
        } else {
            return -1
        }
    }
    return -1
};
```
* Time Complexity: O(logN)
* Space Complexity: O(1)

### Solution 2: 2 pass, Find the Pivot
```
const search = (nums, target) => {
    let piv = findPiv(nums)
    let left, right
    if(piv === 0){
        left = 0; right = nums.length-1;
    }else if(target <= nums[nums.length-1]){
        left = piv; right = nums.length-1
    }else{
        left = 0; right = piv-1
    }
    while(left <= right){
        let middle = Math.floor((left+right)/2)
        if(nums[middle] === target)return middle
        nums[middle] > target ? right = middle-1 : left = middle+1
    }
    return -1
};
const findPiv = arr => {
    if(arr[0] < arr[arr.length-1])return 0
    let left = 0, right = arr.length-1
    while(left <= right){
        let middle = Math.floor((left+right)/2)
        if(arr[middle] > arr[middle+1])return middle+1
        else if(arr[middle] >= arr[left])left = middle+1
        else right = middle-1
    }
    return 0
}
```
* Time Complexity: O(logN)
* Space Complexity: O(1)