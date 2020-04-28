>Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
>Example 1:
```
Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
```
>Example 2:

```
Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
```

### Approach 1
```
var maxProduct = function(nums) {
    var minProduct = nums[0]
    var maxProduct = nums[0]
    var maxNumProduct = nums[0]
    for(let i=1;i<nums.length;i++){
        var currentMaxProduct = maxProduct;
        maxProduct = Math.max(nums[i], maxProduct*nums[i], minProduct*nums[i])
        minProduct = Math.min(nums[i], minProduct*nums[i], currentMaxProduct*nums[i])
        maxNumProduct = Math.max(maxProduct, maxNumProduct)
    }
    return maxNumProduct
};
```
* Time complexity : O(N)
* Space complexity : O(1)