var db = require('./conn');
var moment = require('moment');
var imgArr = ['0f8e386df638a36cbbd9d7d651d98b21.jpg',
    '2f2b8ed51b7702ded2fd31908ad96b65.jpg','3fef23a3d671289442a73bc1b0644db6.jpg',
    '68c4ef1b75ad9a52123196a58f56c732.jpg','e9068e90f9ba88e199e3825fdb9219d9.jpg','efefe1eb3dfee75bcc1eb00bc1335e71.jpg'];
exports.insert_data = function(title,content,type,callback){
    var sql = "insert into article(article_title,article_content,type,add_time,show_img) values(?,?,?,?,?)";
    var rand = Math.floor(Math.random()*6);
    var time = moment().format();
    console.log(rand);
    var arr = [title,content,type,time,imgArr[rand]];
    console.log(time);
    db.query(sql,arr,callback);
};
exports.get_data = function (callback) {
    var sql = "select * from test";
    var arr = [''];
    db.query(sql,arr,callback);
};
