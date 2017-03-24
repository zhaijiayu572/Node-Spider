var spider_model = require('../model/Spider_model');
var cheerio = require('cheerio');
var http = require('http');
var spider = require('./common_spider');
var request = require('request');
var fs = require('fs');
exports.insert_eat_data = function (req,res,next) {
    //获取res
    var Res = res;
    //爬取的网址
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

};
//爬取指定url的链接
function download(url,path,filename,callback) {
    console.log('a');
    http.get(url, function(res) {
        var imgData = "";
        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function (chunk) {
            imgData += chunk;
        });
        path = path+'/'+filename;
        res.on("end", function () {
            fs.writeFile(path, imgData, "binary", function (err) {
                if (err) {
                    console.log("down fail");
                }
                console.log("down success");
                callback();
            });
        });
    });

}
exports.insert_book_data = function (req,res,next) {
    var url = "http://www.haoshu100.com/archives/category/%E7%BB%8F%E5%85%B8%E5%90%8D%E8%91%97";
    var Res = res;
    spider.getHtml(url,function (html) {
        var $ = cheerio.load(html);
        var srcs = [];
        $('.art_img_box h2').each(function () {
            var src = $(this).find('a').attr('href');
            srcs.push(src);
        });
        console.log(srcs.length);
        for(var i=0;i<srcs.length;i++){
            console.log('b');
            spider.getHtml(srcs[i],function (data) {
                var $ = cheerio.load(data);
                var content = '';
                var title = $('.art_title h1').text();
                $('.article_content p').each(function () {
                    content = content +'<p>'+$(this).text()+'</p>';
                });
                var imgName = Math.floor(Math.random()*1000)+'.jpg';
                var imgSrc = $('.article_content img').attr('src');
                download(imgSrc,'./img',imgName,function () {
                //     spider_model.insert_data(title,content,2,imgName);
                });
                spider_model.insert_data(title,content,3,imgName);

            });
        }
        Res.send('hello');


    })
};
exports.show = function (req,res,next) {
    spider_model.get_data(function (result) {
        console.log(result);
        res.render('test',{'rs':result})
    })
};
