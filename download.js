var http = require('http');
var url = require('url');
var AWS = require("aws-sdk");
const express = require('express'); // import express js library
const app = express(); //create express js instance
const path = require('path');

app.set('view engine', 'ejs');

/*AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});
AWS.config.accessKeyId="AKIAI5O66ZOYEKYK5PPQ";
AWS.config.secretAccessKey="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"; */
AWS.config.update({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com"
});
//AWS.config.accessKeyId="AKIAI5O66ZOYEKYK5PPQ";
//AWS.config.secretAccessKey="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";
AWS.config.accessKeyId="AKIAJKZCK7TZ7XCH65NQ";
AWS.config.secretAccessKey="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";
var docClient = new AWS.DynamoDB.DocumentClient();

var aaa=[];


// define a route to download a file
app.get('/download/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
});

app.get('/add', (req, res) => {
    var q2 = url.parse(req.url,true).query;

    var tenhinh = q2.txtTenHinh;
    res.render('themupload',{
        tenhinh:tenhinh
    });

});

app.get('/adddd', (req, res) => {
        var q2 = url.parse(req.url,true).query;

        var ma = q2.txtID;
        var theloai = q2.txtTheLoai;
        var tenhinh = q2.txtTenFile;

        var params = {
            TableName: "Upload",
            Item:{
                "Upload_id": parseInt(ma),
                "Upload_name": tenhinh,
                "TheLoai": theloai,
            }
        };

        console.log("Adding a new item...");
        docClient.put(params, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added success!");
                res.redirect('/getall');
            }
        });

});

app.get('/getall', (req, res) => {
    aaa=[];

    var params = {
        TableName: "Upload",
        ProjectionExpression: "#yr, Upload_name, TheLoai",
        ExpressionAttributeNames: {
            "#yr": "Upload_id"
        },
        ScanIndexForward: false
    };

    docClient.scan(params, onScan);
    function onScan(errMusicHot, dataMusicHot) {
        if (errMusicHot) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(errMusicHot, null, 2));
        } else {
            console.log("Scan succeeded.");
            dataMusicHot.Items.forEach(function(item) {
                aaa.push({id:item.Upload_id, ten:item.Upload_name,theloai:item.TheLoai})
                console.log(" -List File: ", item.Upload_id + ": " + item.Upload_name );
            });
            res.render('getall',{
                aaa:aaa
            });
        }
    }


});

app.listen(8005,() => {
    console.log(`application is running at: http://localhost:8000`);


});