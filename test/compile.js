const webpack = require('webpack')
const path = require('path')

function compile(entry, options) {
	const entryPath = path.resolve(__dirname, 'src/fixtures', entry)
	const compiler = webpack({
		entry: entryPath,
		bail: true,
		output: {
			path: path.resolve(__dirname, 'src/expected'),
			filename: entry
		},
		module: {
			rules: [
				{
					test: /.jpg$/,
					use: [
						{
							loader: path.join(__dirname, '../index.js'),
							options
						}
					]
				}
			]
		}
	})
	compiler.run((err, stats) => {
		if (err) throw err
	})
}

const inlineHiFile = path.resolve(__dirname, 'src/fixtures/hi.inline.js')

compile('hi.js')
compile('hi.inline.js')
