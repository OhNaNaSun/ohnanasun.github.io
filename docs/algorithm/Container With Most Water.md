[container-with-most-water](https://leetcode.com/problems/container-with-most-water/)
### Description

> Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

> Note: You may not slant the container and n is at least 2.

### Approach 1: Brute Force
```
var maxArea = function(height) {
    let maxArea = 0
    for(let i=0;i<height.length;i++){
        for(let j=i+1;j<height.length;j++){
            maxArea = Math.max(maxArea, (j-i)* Math.min(height[i],height[j]))
        }
    }
    return maxArea
};
```
* Time complexity : O(n^2)
* Space complexity : O(1)
### Approach 2: Two Pointer Approach
```
var maxArea = function(height) {
    let maxArea = 0
    let left = 0
    let right = height.length - 1
    while(right > left){
       maxArea = Math.max(Math.min(height[left], height[right]) * (right - left), maxArea)
        if(height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return maxArea
};
```
* Time complexity : O(n)
* Space complexity : O(1)