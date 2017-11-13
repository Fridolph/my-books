对象  函数  闭包

三个概念相辅相成，非常重要。还有两个重要特性：定时器和正则表达式

跨浏览器的web应用不仅需要掌握js语言，还要全面了解浏览器及它们的怪异模式和矛盾，宾要具备当前最佳实践方面的良好基础

性能调试：

```js
var start = new Date().getTime()
for (var n = 0; n < maxCount; i++) {
  /* perform the operation to be measured */
}
var elapsed = new Date().getTime() - start;
assert(true, 'Measured time: ' + elapsed)
```