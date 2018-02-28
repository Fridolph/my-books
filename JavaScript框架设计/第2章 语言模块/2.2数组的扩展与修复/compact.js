// * 过滤数组中的null与undefined，但不影响原数组
function compact(target) {
  return target.filter(el => {
    return el != null
  })
}

