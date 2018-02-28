// *对数组进行洗牌，若不想影响原数组，可以先复制一份出来操作
function shuffle(target) {
  var j,
    x,
    i = target.length

  for (
    ;
    i > 0;
    j = parseInt(Math.random() * i),
      x = target[--i],
      target[i] = target[j],
      target[j] = x
  ) {}
  return target
}
