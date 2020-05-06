[JavaScript Algorithms: What Is Binary Search, A Detailed Step-By-Step, And Example Code](https://medium.com/@jeffrey.allen.lewis/javascript-algorithms-explained-binary-search-25064b896470)
### Binary Search Definition:
In Computer Science, Binary Search (Half-Interval Search) is a Search Algorithm to find a specific element located in an Array (ONLY works with Sorted Arrays). Binary Search is advantageous over a standard Linear Search because it searches faster and more efficiently due to what some developers call as “Dividing and Conquering.”
### Recursive Approach
```
const binarySearchRecusive = (nums, target, left, right) => {
    left = left ?? 0
    right = right ?? nums.length-1
    const mid = Math.floor((right + left)/2)
    if(left > right) return -1
    if(nums[mid] === target) {
        return mid 
    } else if(target > nums[mid]) {
        return binarySearchRecusive(nums, target, mid + 1, right)
    } else{
        return binarySearchRecusive(nums, target, 0, mid - 1)
    }
}
```

* Time Complexity: O(logN).
* Space Complexity: O(1).
  

### Iterative Approach
```
const binarySearch = (nums, target) => {
    let left = 0
    let right = nums.length-1
    while(right >= left){
        const middle = Math.floor((right+left)/2)
        if (nums[middle] === target) {
            return middle
        } else if(target > nums[middle]) {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }
    return -1
}
```
* Time Complexity: O(logN).
* Space Complexity: No extra space.