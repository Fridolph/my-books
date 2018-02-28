// 版本 1：利用空数组的 join 方法

function repeat(target, n) {
  return new Array(n + 1).join(target)
}

// 版本 2：版本 1 的改良版。创建一个对象，使其拥有 length 属性，然后利用 call 方法去调用数组原型的 join 方法，省去创建数组这一步，性能大为提高。重复次数越多，两者对比越明显。另外，之所以要创建一个带 length 属性的对象，是因为要调用数组的原型方法，需要指定 call 的第一个参数为类数组对象，而类数组对象的必要条件是其 length 属性的值为非负数。

function repeat(target, n) {
  return Array.prototype.join.call({ length: n + 1 }, target)
}

// 版本 3: 版本 2 的改良版。利用闭包将类数组对象与数组原型的 join 方法缓存起来，避免每次都重复创建与寻找方法

var repeat = (function() {
  var join = Array.prototype.join,
    obj = {}
  return function(target, n) {
    obj.length = n + 1
    return join.call(obj, target)
  }
})()

// 版本 4：从算法上着手，使用二分法，比如我们将 ruby 重复 5 次，其实我们在第二次已得到 rubyruby，那么第 3 次直接用 rubyruby 进行操作，而不是 ruby

function repeat(target, n) {
  var s = target,
    total = []

  while (n > 0) {
    if (n % 2 == 1) {
      total[total.length] = s
    }
    if (n == 1) break

    s += s
    n = n >> 1
  }
  return total.join('')
}

// 版本 5：版本 4 的变种，免去创建数组与使用 join 方法，它的短处在于它在循环中创建的字符串比要求的还长，需要回减一下

function repeat(target, n) {
  var s = target,
    c = s.length * n

  do {
    s += s
  } while ((n = n >> 1))

  s = s.substring(0, c)

  return s
}

// 版本 6：版本 4 的改良版

function repeat(target, n) {
  var s = target,
    total = ''

  while (n > 0) {
    if (n % 2 == 1) {
      total += s
    }
    if (n == 1) break
    n = n >> 1
  }

  return total
}

// 版本 7：与版本 6 相近。不过在浏览器下递归好像都做了优化（包括 IE6），与其他版本相比，属于上乘方案之一

function repeat(target, n) {
  if (n == 1) return target
  var s = target(target, Math.floor(n / 2))
  s += s
  if (n % 2) s += target

  return s
}
