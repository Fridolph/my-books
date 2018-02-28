// * 对数组进行平坦化处理，返回一个一维的新数组
function flatten(target) {
  let result = []

  target.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item))
    } else {
      result.push(item)
    }
  })

  return result
}
