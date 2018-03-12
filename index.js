var path = require('path')
var qs = require('qs')

module.exports = function(source) {
  if (this.resourceQuery) {
    const queryObj = qs.parse(this.resourceQuery.slice(1))
    if (queryObj.inline) {
      const urlLoaderCtx = Object.assign({
        // default settings for inlining images
        emitFile: false,
        limit: Infinity,
      }, this)
      return require('url-loader').call(urlLoaderCtx, source)
    }
  }
  var parsedPath = path.parse(this.resourcePath)
  return "module.exports = '" + parsedPath.name + "'"
}

module.exports.raw = true