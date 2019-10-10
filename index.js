var path = require('path')
var qs = require('qs')
var loaderUtils = require('loader-utils')

module.exports = function(source) {
	if (this.resourceQuery) {
		var queryObj = qs.parse(this.resourceQuery.slice(1))
		if (queryObj.inline) {
			return require('url-loader').call(this, source)
		}
	}
	var opts = loaderUtils.getOptions(this)
	var parsedPath = path.parse(this.resourcePath)
	var result = ''
	if (opts.base64Inline) {
		var imageTypes = opts.imageTypes || /\.(png|jpg|gif|svg)(\?.*)?$/
		var fontTypes = opts.fontTypes || /\.(ttf|woff)(\?.*)?$/
		var ext = path.extname(this.resourcePath)
		// parse asset type
		var assetMatch = imageTypes.exec(ext)
		var assetType = 'image'
		// if asset not an image, assume it's a font
		if (!assetMatch) {
			assetMatch = fontTypes.exec(ext)
			assetType = 'font'
		}
		var subtype = assetMatch[1]
		var dataUrl = 'data:' + assetType + '/' + subtype + ';base64,' + source.toString('base64')
		// update loader result
		result += 'if (window.InlineSrc) {\n'
		result += '\tInlineSrc.add("' + parsedPath.name + '", "' + dataUrl + '")\n'
		result += '}\n'
	}
	result += "module.exports = '" + parsedPath.name + "'"
	return result
}

module.exports.raw = true
