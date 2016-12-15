#!/usr/bin/env node
var Datastore = require('nedb')
var db = new Datastore({ filename: './url.db', autoload: true });
var shortid = require('shortid');



var program = require('commander');
var pjson = require('./package.json');

program
    .version(pjson.version)
    .option('-p, --port', 'Add peppers')
    .parse(process.argv);


var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");   //设置跨域访问  
    var url = req.originalUrl.split('/?url=')[1];
    if (url) {
        var id = shortid.generate();
        var doc = { url: url, shorturl: '/' + id };
        db.insert(doc, function (err, newDoc) {   // Callback is optional
            console.log('create record: ');
            console.log(newDoc)
            res.json({ shortid: id })
        });
    }else{
        res.json({
                err:'need a url to generate shortid'
            }) 
    }
});

app.get('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");   //设置跨域访问  
    db.findOne({ shorturl: req.url }, function (err, doc) {
        if (doc && doc.url) {
            console.log('redirect ' + req.url + ' to ' + doc.url);
            res.redirect(doc.url)
        }else{
            res.json({
                err:'not find this shorturl'
            })
        }
    });
})

var port = program.port || 3000;
app.listen(port, function () {
    console.log('short-url-server listening on port ' + port + '!');
});
