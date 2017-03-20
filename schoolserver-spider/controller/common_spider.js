var http = require('http');
exports.getHtml = function (url,callback) {
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
            callback(html);
        })
    })
};