### Description

> Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
> (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

> Find the minimum element.

> You may assume no duplicate exists in the array.

_Example 1:_

```
Input: [3,4,5,1,2]
Output: 1
```

_Example 2:_

```
Input: [4,5,6,7,0,1,2]
Output: 0
```

### Approach 1: Brute

```
var findMin = function(nums) {
    for(let i=0;i<nums.length-1;i++){
        if(nums[i]>nums[i+1]) return nums[i+1];
    }
    return nums[0];
};
```

- Time Complexity : O(N)
- Space Complexity : O(1)

### Approach 2: Binary Search

```
var findMin = function(nums) {
    let left = 0
    let right = nums.length -1
    if(nums[right]>=nums[left]){
        return nums[left]
    }
    while(left<right){
        const mid = Math.ceil((left+right)/2)
        if(nums[mid]<nums[mid-1]){
            return nums[mid]
        } else if (nums[mid]>nums[right]){
            left = mid;
        }  else if(nums[mid] < nums[left]){
            right = mid
        }
    }
};
```

- Time Complexity : Same as Binary Search O(logN)
- Space Complexity : O(1)

### Approach 3: recursive

```
var findMin = function(nums) {
    if(nums[0] <= nums[nums.length-1]){
        return nums[0]
    }
    let mid = Math.ceil(nums.length/2)
    if(nums[mid]<nums[mid-1]){
        return nums[mid]
    } else if (nums[mid]>nums[nums.length-1]){
        return findMin(nums.slice(mid, nums.length))
    }  else if(nums[mid] < nums[0]){
        return findMin(nums.slice(0, mid))
    }
};
```

- Time Complexity : O(logN)
- Space Complexity: O(logN) //?
