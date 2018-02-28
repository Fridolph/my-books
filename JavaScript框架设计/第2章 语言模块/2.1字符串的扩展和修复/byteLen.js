/**
 ** byteLen方法，取得一个字符串所有字节的长度。这是一个后端过来的方法，如果将一个英文字符插入数据库char, varchar, text类型的字段时占用一个字节，
 ** 而将一个中文字符插入时占用两个字节。为避免插入溢出，就需要事先判断字符串的字节长度。在前端，我们要用户填写文本，限制字节上的长短，比如发短信，
 ** 也要用到此方法。随着浏览器普及对二进制的操作，该方法也越来越常用
 */

//? 版本1 假设当字符串每个字符的Unicode编码均小于或等于255时，byteLenth为字符串长度：
//? 再遍历字符串，遇到Unicode编码大于255时，为byteLength补加1
function byteLen(target) {
  var byteLength = target.length,
    i = 0

  for (; i < target.length; i++) {
    if (target.charCodeAt(i) > 255) {
      byteLength++
    }
  }
  return byteLength
}

//? 版本2： 使用正则表达式，并支持设置汉字的存储字节数，比如用mysql存储汉字时，是3个字节数
function byteLen(target, fix) {
  fix = fix ? fix : 2
  var str = new Array(fix + 1).join('-')
  return target.replace(/[^\x00-\xff]/g, str).length
}

//? 版本3：来自腾讯的解决方案。TX通过多子域名+postMessage+manifest离线proxy页面的方式扩大localStorage的存储空间。
//? 在这个过程中，我们需要知道用户已经保存了多少内容，因此就必须编写一个严谨的byteLen方法
// TODO - - 暂省略