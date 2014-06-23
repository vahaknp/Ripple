var express = require('express');
var fs = require('fs');
var app     = express();

var tokenize = require('./app/tokenize');
var scrape = require('./app/scrape');

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

//Define path of file
path = 'samplecode/samplecode.js';
//Find function names
keywords = tokenize.findFunctions(path);
//If too long for search, shorten
var too_long = true;
while (too_long){
    if (keywords.join().length > 127){
        keywords.pop();
    }
    else{
        too_long = false;
    }
};
//Scrape Github for names of repos
scrape.findURLs(keywords);