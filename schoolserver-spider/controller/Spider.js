var spider_model = require('../model/Spider_model');
var cheerio = require('cheerio');
var http = require('http');
var spider = require('./common_spider');
exports.insert_data = function (req,res,next) {

    var Res = res;
    var url = 'http://www.suibi8.com/suibi/youji';
    url = 'http://www.sina.com.cn';

    spider.getHtml(url,function(html){
        Res.send(html);
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
