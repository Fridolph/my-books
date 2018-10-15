SW代码为支持 WebP图片的浏览器返回此格式的图片

```js
this.addEventListener('fetch', event => {
  let supportWebp = false
  if (event.request.headers.has('accept')) {
    supportsWebp = event.request.headers.get('accept').includes('webp')

  }
  if (supportsWebp) {
    let req = event.request.clone()
    let returnUrl = req.url.substr(0, req.url.lastIndexOf('.') + '.webp')
    event.respondWith(
      fetch(returnUrl, {
        mode: 'no-cors'
      })
    )
  }
})
```

## 总结

fetch API是浏览器中的新API，它旨在使代码更简洁、更便于阅读。

fetch事件允许拦截任何浏览器发出的HTTP请求。这个功能及其强大，它允许修改响应，甚至创建自定义的HTTP响应，而不与服务器通信。

使用Service Worker能进入fetch事件并查看浏览器是否支持webp图片。

现代浏览器允许用户在设置中开启节省流量的功能。如果启用此功能，浏览器会为每个HTTP请求添加一个新的请求头，使用SW可以进入fetch事件并决定是否返回网站的轻量级版本。
