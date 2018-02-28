/**
 ** 转换为驼峰风格
 */
function camelize(target) {
  if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
    // 提前判断，提高效率
    return target
  }
  return target.replace(/[-_][^-_]/g, function(match) {
    return match.charAt(1).toUpperCase()
  })
}
