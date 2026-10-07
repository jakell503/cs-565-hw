/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

const twosums = (arr, target) => {
  const output = [];
  for (let i = 0; i < arr.length - 1; ++i) {
    //console.log(i);
    for (let j = i + 1; j < arr.length; ++j) {
      if (arr[i] + arr[j] === target) {
        output.push(i);
        output.push(j);
        // console.log(i);
        // console.log(j);
      }
    }
  }
  return output;
};

console.log("Example 1:", twosums([2, 7, 11, 15], 9));
console.log("Example 2:", twosums([3, 2, 4], 6));
console.log("Example 3:", twosums([3, 3], 6));
