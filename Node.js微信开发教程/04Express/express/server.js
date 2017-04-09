var express = require('express')
var app = express()
var path = require('path')
var open = require('open')
var routes = require('./router/index')

app.use(express.static(path.join(__dirname, 'www/')));

// view engine setup
app.set('view', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', routes)

app.listen(4001)

open('http://127.0.0.1:4001')