/**
 ** 用于对字符串进行截断处理，当超过限定长度，默认添加3个点号
 */
function truncate(target, length, truncation) {
  length = length || 30
  truncation = truncation === void 0 ? '...' : truncation

  return target.length > length
    ? target.slice(0, length - truncation.length) + truncation
    : String(target)
}
