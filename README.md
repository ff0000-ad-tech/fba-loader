##### 160over90 - Ad Technology

# FBA Loader

This is our Babel loader used for binary asset imports (images and fonts).

These assets are subsequently either:

1. Declared in the index, see [wp-plugin-index](https://github.com/ff0000-ad-tech/wp-plugin-index)

   - copied to 3-traffic for distribution
   - preloaded prior to build execution, see [ad-entry](https://github.com/ff0000-ad-tech/ad-entry)

2. Compiled into a single binary payload, see [fba-compile](https://github.com/ff0000-ad-tech/fba-compiler)

   - `fba-payload.png` output to 3-traffic for distribution
   - preloaded & parsed prior to build execution, [ad-entry](https://github.com/ff0000-ad-tech/ad-entry)

## Base64 - Deprecated

There is functionality here that could also inline the binary assets in the build bundle as base-64. We have disabled it for now, because the binary options are 25% fewer bytes.

...

Loading a binary asset will export a key to access its corresponding asset within an FBA payload (i.e. the filename without the extension):

```js
import imgFile from './img.jpg'
// imgFile === 'img'
```

You can also choose to inline certain assets by falling back on the `url-loader`. If you're inlining an asset, options you pass to this loader will apply to the `url-loader`. To inline, add the query string `?inline=true` to the end of the file import:

```js
import jif from './jif.gif'
// jif === Base64 contents of jif.gif as a data URL
```
