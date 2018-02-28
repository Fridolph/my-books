/**
 * 判定目标字符串是否位于原字符串的结尾之处
 */
function endWith(target, str, ignorecase) {
  var end_str = target.substring(target.length - str.length)
  return ignorecase
    ? end_str.toLowerCase() === str.toLowerCase()
    : (end_str = str)
}
