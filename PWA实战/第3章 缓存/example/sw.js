// 缓存名称
const cacheName = 'helloWorld'

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll([
        '/test.js',
        '/images/hello.png'
      ])
    })
  )
})

this.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(res => {
    if (res) return res
    return fetch(event.request)
  }))
})
