/**
 ** jQuery makeArray方法
 *? jQuery对象是用来存储与处理dom元素的，它主要依赖于setArray方法来设置和维护长度与索引
 *? 而setArray的参数要求是一个数组。该方法保证就算没有参数也要返回一个空数组
 */

var makeArray = function(array) {
  var ret = []
  if (array != null) {
    var i = array.length
    if (i == null || typeof array === 'string' || jQuery.isFunction(array) || array.setInterval) {
      ret[0] = array
    } else {
      while (i) {
        ret[--i] = array[i]
      }
    }
  }
  return ret
}