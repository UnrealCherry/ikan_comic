var express = require('express');
var app = express();
var superagent  =require('superagent')   //一个类似Ajax为了访问网页返回数据的包
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var http=require("http")
var bodyParser = require('body-parser');
// respond with "hello world" when a GET request is made to the homepage
var localhost='http://127.0.0.1:3000'
var methods=require('./router/public')
var index = require('./router/index')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))// for parsing application/x-www-form-urlencoded

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '112233',
  database : 'mysql'
});

module.exports=function () {
  return new Promise(function (resolve,reject) {
    connection.connect(function(err) {
      if (err) {
        reject()
        console.error('error connecting: ' + err.stack);
        return;
      }
      resolve(connection)
      console.log('connected as id ' + connection.threadId);
    });
  })
}








