/**
 * @param {data} 想要查找的数组
 * @param {dest} 查找的具体项
 * @param {start} [start=0] 默认从0开始
 * @param {end} 数组的长度
 */
function binarySearch(data, dest, start = 0, end) {
  var end = end || data.length - 1,
      mid = Math.floor((start + end) / 2);
  
  if (dest in data) {
    if (data[mid] === dest) {
      return `查找了 ${mid} 次`;
    }
    if (dest < data[mid]) {
      return binarySearch(data, dest, 0, mid - 1);
    } else {
      return binarySearch(data, dest, mid + 1, end);
    }
  } else {
    return '该数值不在查找的数组中'
  }  
}

var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87];
binarySearch(arr,4);