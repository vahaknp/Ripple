var request = require('request');
var cheerio = require('cheerio');

findURLs = function(keywords) {
    //Create URL based on keywords
    var titles = []; 
    url = 'https://github.com/search?q=';
    var length = keywords.length;
    for (var index in keywords){
        url = url+keywords[index];
        if (index != length-1){
            url = url+'+';
        }
    }
    url = url + '&ref=advsearch&type=Code&l=JavaScript';

    //Scrape URL
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);   
            $('.code-list').filter(function(){
                $(this).find('.code-list-item').each(function(i, elem) {
                    titles[i] = $(this).find('.title').children().first().text();
                });
            });
        }
        console.log(titles);
    });
};

module.exports.findURLs = findURLs;
