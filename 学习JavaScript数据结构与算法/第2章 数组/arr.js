// 添加
var numbers = [0,1,2];
// 在数组的最大长度索引上写，也相当于添加
numbers[numbers.length] = 3;
// 使用push方法
numbers.push(4);

// 插入元素到数组首位
// for (var i = numbers.length; i >= 0; i--) {
//   numbers[i] = numbers[i - 1];
// }
// numbers[0] = -1;
numbers.unshift(-1);
numbers.unshift(-2);
// console.log(numbers) 
// [-2, -1, 0, 1, 2, 3, 4]

// 删除元素 - 数组中末尾的元素
numbers.pop();
// console.log(numbers)

// 在任意位置添加或删除元素
numbers.splice(0, 2);
// console.log(numbers)
numbers.splice(4, 3, 4, 5, 6)
// console.log(numbers)

// 二维数组
var arr = [];
arr[0] = [1,2,3,4,5,6,7,8,9];
arr[1] = [1,2,3,4,5,6,7,8,9];
// console.log(arr);

// 迭代二维数组
function printMatrix(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      console.log(matrix[i][j])
    }
  }
}
// printMatrix(arr)