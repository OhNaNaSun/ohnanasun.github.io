### Description

> Given an array of integers, return indices of the two numbers such that they add up to a specific target.

> You may assume that each input would have exactly one solution, and you may not use the same element twice.

> Example:
> Given nums = [2, 7, 11, 15], target = 9,
> Because nums[0] + nums[1] = 2 + 7 = 9,
> return [0, 1].

### Approach 1: Brute Force

```
var twoSum = function(nums, target) {
    for(let i=0;i<nums.length;i++) {
        for(let j=i+1;j<nums.length;j++){
            if(nums[j] === target-nums[i]){
                return [i,j]
            }
        }
    }
};
```

- Time complexity : O(n^2).
- Space complexity : O(1).

### Approach 2: Two-pass Hash Table

```
var twoSum = function(nums, target) {
    const hashMap = {}
    nums.forEach((item,index) => {
        hashMap[item]=index
    })
    for (var i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (hashMap[complement] && hashMap[complement] !== i) {
            return [i, hashMap[complement]]
        }
    }
};
```

- Time complexity : O(n).
- Space complexity : O(n). The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.

### Approach 3: One-pass Hash Table

```
var twoSum = function(nums, target) {
    const hashMap = {}
    for (var i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (hashMap[complement] !== undefined && hashMap[complement] !== i) {
            return [i, hashMap[complement]]
        }
        hashMap[nums[i]] = i
    }
};
```

- Time complexity : O(n).
- Space complexity : O(n). The extra space required depends on the number of items stored in the hash table, which stores exactly n elements.
