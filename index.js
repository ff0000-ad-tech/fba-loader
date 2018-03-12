var path = require('path')
var qs = require('qs')

module.exports = function(source) {
  if (this.resourceQuery) {
    const queryObj = qs.parse(this.resourceQuery.slice(1))
    if (queryObj.inline) {
      return require('url-loader').call(this, source)
    }
  }
  var parsedPath = path.parse(this.resourcePath)
  return "module.exports = '" + parsedPath.name + "'"
}

module.exports.raw = true