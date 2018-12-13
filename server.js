// khai báo sử dụng module HTTP
var http = require('http');
//Khai báo sử dụng module fs
var fs = require('fs');
//Khởi tạo server chạy cổng 8000
http.createServer(function (req, res) {
    //định dang response head trả về
    res.writeHead('200',{'content-type' : 'text/html'});
    //đọc file code.html encode utf8
    fs.readFile('trangchu.html','utf8',function(err, data) {
        if (err) throw err;
        // in ra nội dung đọc được
        res.write(data);
        //kết thúc response
        res.end();
    });

}).listen(8080);