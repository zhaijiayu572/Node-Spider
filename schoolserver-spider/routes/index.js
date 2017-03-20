var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var spider = require('../controller/Spider');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/spider',function (req,res,next){
  var url = 'http://www.sina.com.cn/';
  var Res = res;
  http.get(url,function (res) {
    var chunks = [];
    var length = 0;
      res.on('data',function (chunk) {
          chunks.push(chunk);
          length += chunk.length; 
      });
      res.on('end',function () {
          var data = Buffer.concat(chunks,length);
          var html = data.toString();
          var $ = cheerio.load(html);
          var mydatas = [];
          $('.main-nav .nav-mod-1 b').each(function () {
              mydatas.push($(this).text());
          });
          Res.send(mydatas);

      })
  })
});
router.get('/insert',spider.insert_data);
router.get('/show',spider.show)
module.exports = router;
