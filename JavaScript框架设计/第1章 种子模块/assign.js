/**
 *c Object.assign 及兼容 
 */
function ToObject(val) {
  if (val == null) {
    throw new TypeError('Object.assign cannot be called with null or undefined')
  }
  return Object(val)
}

// 短路，即有Object.assign用原生，没有才是后面的函数
module.exports = Object.assign || function(target, source) { 
  var to = ToObject(target),
    from,
    keys;
  
  for (var s = 1; s < arguments.length; s++) {
    from = arguments[s]
    keys = Object.keys(Object(from))

    for (var i = 0; i < keys.length; i++) {
      to[keys[i]] = from[keys[i]]
    }
  }
  return to;
}