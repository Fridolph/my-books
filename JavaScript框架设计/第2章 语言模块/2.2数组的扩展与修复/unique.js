// * 对数组进行去重操作，返回一个没有重复元素的新数组
function unique(target) {
  let result = []

  for (let i = 0, len = target.length; i < len; i++) {
    if (target.indexOf(target[i]) == i) {
      result.push(arr[i])
    }
  }

  return result
}
