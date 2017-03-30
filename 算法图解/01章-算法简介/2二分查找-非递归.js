/**
 * @param {data} 查找的数组 
 * @param {dest} 要查找的数
 * @returns 找到或是没有找到
 */
function binarySearch(data, dest) {
  var low  = 0, high = data.length - 1;

  while (low <= high) {
    var mid = Math.floor((high + low) / 2);
    if (data[mid] === dest) {
      return `查找了${mid}次， 找到了${dest}`;
    }
    if (dest > data[mid]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return '该数值不在查找的数组中'
}
var arr = [-34, 1, 3, 4, 5, 8, 34, 45, 65, 87];
binarySearch(arr, 4);
