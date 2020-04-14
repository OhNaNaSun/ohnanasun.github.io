> Given an array of integers, find if the array contains any duplicates.
Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

### Approach 1 (Naive Linear Search)

```
var containsDuplicate = function(nums) {
    let hasDup = false
    for(var i = 0; i < nums.length-1; i++){
        for(var j=i+1; j < nums.length; j++){
            if(nums[i] === nums[j]){
                hasDup = true
                break
            }
        }
    }
    return hasDup
};
```
* Time complexity : O(n^2).
* Space complexity : O(1). 

### Approach 2 (Sorting)
```
var containsDuplicate = function(nums) {
    nums.sort()
    let ifDup = false
    for(var i = 0; i < nums.length-1; i++){
        if(nums[i+1] === nums[i]){
            ifDup = true
            break
        }
    }
    return ifDup
    // or return nums.some((e,i)=>e===nums[i+1]);
};
```
* Time complexity : O(nlogn). Sorting is O(nlogn) and the sweeping is O(n). The entire algorithm is dominated by the sorting step, which is O(nlogn)
  
  >[O(nlog(n)) is a superset of O(n) so really it is just O(nlog(n)).]

* Space complexity : O(1). Space depends on the sorting implementation which, usually, costs O(1) auxiliary space if heapsort is used.

### Approach 3 (Hash Table)
```
var containsDuplicate = function(nums) {
    var hasDup = false
    var numSet = new Set()
    for(var i = 0; i<nums.length; i++){
        const item = nums[i]
        if(numSet.has(item)) {
            hasDup = true;
            break
        } else {
            numSet.add(nums[i])
        }
        
    }
    return hasDup
};
```
* Time complexity : O(n). We do search() and insert() for n times and each operation takes constant time.

* Space complexity : O(n). The space used by a hash table is linear with the number of elements in it.
### Approach 4, compare set length 
```
 var containsDuplicate = function(nums) {
    return nums.length > new Set(nums).size
};
```
* Time complexity : O(1).
* Space complexity : O(n).
  

### Approach 5, Use indexOf
```
var containsDuplicate = function(nums) {
    var hasDup = false
    for(var i = 0; i<nums.length; i++){
        if(nums.indexOf(nums[i]) !== nums.lastIndexOf(nums[i])){
            hasDup = true
            break
        }
    }
    return hasDup
};
```
* Time complexity : O(n^2). 
  > The most efficient way to find the first index matching a value in an unsorted array is to just walk through the list in order, which is O(n).
* Space complexity : O(1).
