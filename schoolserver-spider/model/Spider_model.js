var db = require('./conn');
exports.inser_data = function(title,content,callback){
    var sql = "insert into test(a_title,a_content) values(?,?)";
    var arr = [title,content];
    db.query(sql,arr,callback);
};
exports.get_data = function (callback) {
    var sql = "select * from test";
    var arr = [''];
    db.query(sql,arr,callback);
};
