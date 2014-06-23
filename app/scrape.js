var request = require('request');
var cheerio = require('cheerio');
var wget = require('wget');
var fs = require('fs');

findURLs = function(keywords, iter) {
    //Create URL based on keywords
    var urls = []; 
    url = 'https://github.com/search?q=';
    var length = keywords.length;
    for (var index in keywords){
        url = url+keywords[index];
        if (index != length-1){
            url = url+'+OR+';
        }
    }
    url = url + '&ref=advsearch&type=Code&l=JavaScript';

    //Scrape URL
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);   
            $('.code-list').filter(function(){
                $(this).find('.code-list-item').each(function(i, elem) {
                    urls[i] = $(this).find('.title').children().first().next().attr('href')
                });
            });
        }
        for (var index in urls){
            console.log(urls[index]);
            var temp = urls[index].replace('/blob', '');
            temp = 'https://raw.githubusercontent.com' + temp
            var src = temp;
            var output = 'tmp/code'+iter+index+'.js';
            var options = {
                port: 8081
            };
            var download = wget.download(src, output, options);
            download.on('error', function(err) {
                console.log(err);
            });
            download.on('end', function(output) {
                console.log(output);
            });
        }
    });
};

module.exports.findURLs = findURLs;
