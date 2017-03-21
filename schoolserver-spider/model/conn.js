var mysql = require('mysql');
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'schoolserver'
});

exports.query = function (sql,arr,callback) {
    pool.getConnection(function(err, connection) {
        // connected! (unless `err` is set)
        connection.query(sql,arr,function (error, results, fields) {
            connection.release();
            // if(error){
            //     console.log(error);
            // }
            callback&&callback(results);
        })
    });
}
