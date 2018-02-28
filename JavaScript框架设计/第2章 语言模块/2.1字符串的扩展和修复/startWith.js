/**
 ** 判定目标字符串是否位于原字符串的开始之处
 */
function startWith(target, str, ignorecase) {
  var start_str = target.substr(0, str.length)
  return ignorecase
    ? start_str.toLowerCase() === str.toLowerCase()
    : (start_str = str)
}
