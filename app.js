'use strict'

var Koa = require('koa');
var wechat = require('./wechat/g');
var config = require('./config');
var reply = require('./myWechat/reply');

var app = new Koa();
app.use(wechat(config.wechat, reply.reply));

app.listen(8080);
console.log("===已开启端口:8080");