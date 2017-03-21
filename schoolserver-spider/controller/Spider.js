var spider_model = require('../model/Spider_model');
var cheerio = require('cheerio');
var http = require('http');
var spider = require('./common_spider');
exports.insert_data = function (req,res,next) {

    var Res = res;
    var url = 'http://www.fanwen99.cn/article/%E4%B8%AD%E5%9B%BD%E7%9A%84%E7%BE%8E%E9%A3%9F%E4%BB%8B%E7%BB%8D.htm';
    // url = 'http://www.sina.com.cn';
    spider.getHtml(url,function(html){
        var $ = cheerio.load(html);
        var urls = [];
        $('#left dl dt').each(function () {
            var url = 'http://www.fanwen99.cn'+$(this).find('a').attr('href');
            urls.push(url);
        });
        for(var i=0;i<urls.length;i++){
            spider.getHtml(urls[i],function (article) {
                var $ = cheerio.load(article);
                var content = '';
                var title = $('#left>h1').text();
                $('#doctext p').each(function () {
                    content = content+'<p>'+$(this).text()+'</p>';
                });
                spider_model.insert_data(title,content,1);
            })
        }
        Res.send('success');

    });

    // res.send('a');
    // http.get(url,function (res) {
    //     var chunks = [];
    //     var length = 0;
    //     res.on('data',function (chunk) {
    //         chunks.push(chunk);
    //         length +=chunk.length
    //     });
    //     res.on('end',function () {
    //         var data = Buffer.concat(chunks,length);
    //         var html = data.toString();
    //
    //         console.log('b');
    //         var arr = [];
    //         var $ = cheerio.load(html);


            // $('.list .list_content li').each(function () {
            //     url = $(this).find('h4 a').attr('href');
            //     console.log('c');
            //     Res.send('end');

                // http.get(url,function (res) {
                //     arr.push(url);
                //     var chunks = [];
                //     var length = 0;
                //     res.on('data',function (chunk) {
                //         chunks.push(chunk);
                //         length +=chunk.length
                //     });
                //     res.on('end',function () {
                //         var data = Buffer.concat(chunks,length);
                //         var html = data.toString();
                //         // Res.send(html);
                //         var title = '';
                //         var content = '';
                //         var $ = cheerio.load(html);
                //         // $('.list .list_content li').each(function () {
                //         //     url = $(this).find('h4 a').attr('href');
                //         //
                //         // });
                //         title = $('.article .article_tit').find('h1').text();
                //         $('.article .article_content p').each(function () {
                //             content += $(this).text();
                //         });
                //         // Res.send(content);
                //         // spider_model.inser_data(title,content);
                //     })
                // })
            // });
        // })
    // })
};
exports.show = function (req,res,next) {
    spider_model.get_data(function (result) {
        console.log(result);
        res.render('test',{'rs':result})
    })
};
