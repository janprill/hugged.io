// build.js
var _ = require('lodash')
var fs = require('fs')
var gzip = require('gzip-size')
var filesize = require('filesize')
var cssstats = require('cssstats')
var parseColors = require('./parse-colors')
var parseCombos = require('./parse-combos')
var parseCombosAA = require('./parse-combos-aa')
var parseCombosAAA = require('./parse-combos-aaa')

var css = fs.readFileSync('./css/tachyons.css', 'utf8')
var colors = parseColors(css)
var combos = parseCombos(colors)
var combosAA = parseCombosAA(colors)
var combosAAA = parseCombosAAA(colors)


var module = require('tachyons-skins/package.json')
var moduleCss = fs.readFileSync('node_modules/tachyons-skins/css/tachyons-skins.min.css', 'utf8')
var moduleObj = cssstats(moduleCss)
var moduleSize = filesize(moduleObj.gzipSize)
var moduleName = module.name

var srccss = fs.readFileSync('./src/css/_skins.css', 'utf8')
var navDocs = fs.readFileSync('./src/templates/nav_docs.html', 'utf8')
var siteFooter = fs.readFileSync('./src/templates/footer.html', 'utf8')
var siteHeader = fs.readFileSync('./src/templates/header.html', 'utf8')
var head = fs.readFileSync('./src/templates/head.html', 'utf8')
var googleAnalytics = fs.readFileSync('./src/templates/ga.html', 'utf8')


var template = fs.readFileSync('./src/templates/docs/skins/index.html', 'utf8')
var tpl = _.template(template)
var html = tpl({
  moduleVersion: module.version,
  moduleSize: moduleSize,
  name: moduleName,
  moduleObj: moduleObj,
  srccss: srccss,
  navDocs: navDocs,
  siteFooter: siteFooter,
  googleAnalytics: googleAnalytics,
  head: head,
  siteHeader: siteHeader,
  colors: colors,
  combos: combos,
  combosAA: combosAA,
  combosAAA: combosAAA
})

fs.writeFileSync('./docs/themes/skins/index.html', html)
