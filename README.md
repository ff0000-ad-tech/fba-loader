##### RED Interactive Agency - Ad Technology

[![npm (tag)](https://img.shields.io/npm/v/@ff0000-ad-tech%2Ffba-loader.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Ffba-loader)
[![GitHub issues](https://img.shields.io/github/issues/ff0000-ad-tech/fba-loader.svg?style=flat-square)](https://github.com/ff0000-ad-tech/fba-loader)
[![npm downloads](https://img.shields.io/npm/dm/@ff0000-ad-tech%2Ffba-loader.svg?style=flat-square)](https://www.npmjs.com/package/@ff0000-ad-tech%2Ffba-loader)

[![GitHub contributors](https://img.shields.io/github/contributors/ff0000-ad-tech/fba-loader.svg?style=flat-square)](https://github.com/ff0000-ad-tech/fba-loader/graphs/contributors/)
[![GitHub commit-activity](https://img.shields.io/github/commit-activity/y/ff0000-ad-tech/fba-loader.svg?style=flat-square)](https://github.com/ff0000-ad-tech/fba-loader/commits/master)
[![npm license](https://img.shields.io/npm/l/@ff0000-ad-tech%2Ffba-loader.svg?style=flat-square)](https://github.com/ff0000-ad-tech/fba-loader/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# FBA Loader

Loader used for binary asset imports pulled from FBA payloads created by [FF0000 fba-compiler](https://github.com/ff0000-ad-tech/fba-compiler)

## Usage

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
