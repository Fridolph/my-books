var express = require('express')
var router = express.Router()
var getHomepage = require('./homepage')

router.get('/', getHomepage)

module.exports = router