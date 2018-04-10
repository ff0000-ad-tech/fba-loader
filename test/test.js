import path from 'path'
import fs from 'fs'
import test from 'ava'
import webpack from 'webpack'
import MemoryFS from 'memory-fs'

function normalize(string) {
	return string.replace(/(\r\n|\r|\n)/g, '\n').trim()
}

function setupEnv(entry, options) {
	const entryPath = path.join(__dirname, 'src', 'fixtures', entry)
	const compiler = webpack({
		entry: entryPath,
		bail: true,
		output: {
			path: '/',
			filename: 'bundle.js'
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

	const mockFs = new MemoryFS()

	compiler.outputFileSystem = mockFs

	return {
		mockFs,
		compiler
	}
}

// test bundling of src files against expected bundles
async function fixture(t, entry, options) {
	const { mockFs, compiler } = setupEnv(entry, options)

	await new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			err ? reject(err) : resolve(stats)
		})
	})

	// uncomment to update expected files
	/* const bundle = mockFs.readFileSync('/bundle.js', 'utf8')
	fs.writeFileSync(path.join(__dirname, 'src', 'expected', entry), bundle.replace(/\r/g, '')) */

	t.is(
		normalize(mockFs.readFileSync('/bundle.js', 'utf8')),
		normalize(fs.readFileSync(path.join(__dirname, 'src', 'expected', entry), 'utf8'))
	)
}

// Snapshot tests
test(fixture, 'hi.js')
test(fixture, 'hi.inline.js')
