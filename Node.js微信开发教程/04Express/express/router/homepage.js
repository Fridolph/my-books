var getHomepage = function(req, res, next) {
  res.render('index', { title: 'Homepage' })
}

module.exports = getHomepage