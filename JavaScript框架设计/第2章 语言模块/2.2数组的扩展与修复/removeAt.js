//* 移除数组中指定位置的元素，返回布尔值表示成功与否
function removeAt(target, index) {
  return !!target.splice(index, 1).length
}