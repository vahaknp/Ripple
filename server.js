var express = require('express');
var fs = require('fs');
var app     = express();

var tokenize = require('./app/tokenize');
var scrape = require('./app/scrape');
var moss = require('./app/moss');

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

//Define path of file
path = 'samplecode/samplecode.js';
//Find function names
keywords = tokenize.findFunctions(path);

//Scrape Github for names of repos
scrape.findURLs(keywords);



