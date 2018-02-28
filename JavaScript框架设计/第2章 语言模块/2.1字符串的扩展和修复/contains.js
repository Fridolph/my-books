/**
 ** 判定一个字符串是否包含另一个字符串
 */
function contains(target, it) {
  return target.indexOf(it) != -1
}

// 改进后
function contains2(target, str, separator) {
  return separator
    ? (separator + target + separator).indexOf(separator + str + separator) > -1
    : target.indexOf(str) > -1
}
