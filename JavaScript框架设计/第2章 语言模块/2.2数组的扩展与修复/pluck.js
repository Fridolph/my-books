// * 取得对象数组的每个元素的指定属性，组成数组返回
function pluck(target, name) {
  let result = [],
    prop

  target.forEach(item => {
    prop = item[name]

    if (prop != null) {
      result.push(prop)
    }
  })

  return result
}
