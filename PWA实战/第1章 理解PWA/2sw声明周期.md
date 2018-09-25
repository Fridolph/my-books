例子，一个博客网站

1. 用户导航到一个url
2. 在注册过程中，浏览器下载、解析和执行Service Worker
3. 一旦SW执行，就激活安装事件
4. 如果成功，SW就可以控制客户端并处理功能事件

---

一种记住SW声明周期的方法就是把它当成一组交通信号灯。

在注册过程汇中，SW处于红灯状态，因为它还需要下载和解析。接下来，它处于黄灯状态，因为它正在执行，还没有完全准备好。如果上述步骤都成功了，SW将处于绿灯状态，随时可以使用。

第一次加载页面时，SW还没有激活，所以它不会处理任何请求，只有当它安装和激活后，才能控制在其范围内的一切。这意味着，只有刷新或者导航到另一个页面，SW内的逻辑才会启动

## 基础示例

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log(`serviceWorker registration successful with scople: ${registration.scope}`)
    }).catch(err => {
      console.error(`serviceWorker registration failed: ${err}`)
    })
  }
</script>
```

在script标签内，首先检查浏览器是否支持SW。若支持就使用 `navigator.serviceWorker.register('/sw.js')` 函数注册，该函数又会通知浏览器下载SW文件，如果注册成功，它会开始SW生命周期的剩余阶段。

`navigator.serviceWorker.register()` 函数返回Promise，如果注册成功，我们可以决定如何继续进行。

SW是事件驱动的，它允许通过进入不同的事件来监听任何网络请求。fetch便是其中一个关键事件，当一个资源发起fetch事件时，你可以决定如何继续进行。可以将发出的http请求或接收的http响应更改成任何内容。


假设下面的代码出现在SW文件中

```js
// 代码清单1.2
// 为fetch事件添加事件监听器
self.adddEventListener('fetch', function(event) {
  // 检查传人入的HTTP请求url是否请求以.jpg结尾的文件
  if (/\.jpg$/.test(event.request.url)) {
    // 尝试获取独角兽图片并用它作为替代图片来响应请求
    event.respondWith(fetch('/images/unicorn.jpg))
  }
})
```

上面 监听了fetch事件，如果HTTP请求的是jpg文件，就拦截请求并牵制返回一张独角兽图片，而不是原始URL请求的图片。代码会为该网站上的每幅jpg图片请求执行相同的操作。
