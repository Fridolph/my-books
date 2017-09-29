const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify({
    platform: process.platform,
    version: process.version,
    uptime: Math.round(process.uptime())
  }))
})

const PORT = 7070;
server.listen(PORT, () => {
  console.log(`Ajax server is running on port ${PORT}`)
})