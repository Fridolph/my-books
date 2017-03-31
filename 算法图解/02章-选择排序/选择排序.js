/**
 * 思路：
 * 1. 遍历数组，把每个数都与第一个数作比较，
 * 2. 如果小于第一个数就交换位置
 * 2. 一直循环重复 n-1 轮，最终实现
 */
function selectSort(arr) {
  var temp,
    len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
  return arr;
}