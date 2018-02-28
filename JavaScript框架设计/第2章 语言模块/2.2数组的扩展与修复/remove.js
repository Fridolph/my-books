function removeAt(target, index) {
  return !!target.splice(index, 1).length
}

// * 移除数组中第一个匹配传参的那个元素，返回布尔值表示成功与否
function remove(target, item) {
  var index = target.indexOf(item)
  if (index) {
    return removeAt(target, index)
  }
  return false
}