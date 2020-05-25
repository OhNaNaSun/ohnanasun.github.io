const findSum = function(nums) {
    const result = []
    nums = nums.sort((a,b) => a-b)
    for(let k=0;k<nums.length-2;k++){
        if(nums[k] === nums[k-1]) continue
       const remainTarget = -nums[k]
        let left = 1 + k
        let right = nums.length - 1
        while(right > left) {
            if(nums[left] === nums[left-1] && (left -1) !== k) {
                left++
                continue
            }
            if(nums[right] === nums[right+1]) {
                right--
                continue
            }
            const sum = nums[left] + nums[right]
            if(sum > remainTarget){
                right--
            }else if(sum < remainTarget ){
                left++
            } else {
                result.push([nums[k], nums[left], nums[right]])
                right--
            }
        }
    }
    return result
}
const findTwoSum = (nums, target) => {
    nums = nums.sort((a,b)=>a-b)
    let left = 0
    let right = nums.length - 1
    console.log(nums)
    const result = []
    while(right > left) {
        if(nums[left] ===nums[left-1]) left++
        if(nums[right] ===nums[right-1]) right--
        const sum = nums[left] + nums[right]
        if(sum > target){
            right--
        }else if(sum < target){
            left++
        } else {
            result.push([nums[left], nums[right]])
            right--
        }
    }
    return result
}
console.log(findSum([-1,0,1,2,-1,-4]))