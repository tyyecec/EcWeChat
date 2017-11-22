'use strict'

var config = require('../config');
var Wechat = require('../wechat/wechat');
var menu = require('./menu');
var wechatApi = new Wechat(config.wechat);

wechatApi.delMenu().then(function () {
    return wechatApi.createMenu(menu);
}).then(function (msg) {
    console.log(msg);
})

exports.reply = function* (next) {
    var message = this.weixin;
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫二维码关注的：' + message.EventKey + ' ' + message.Ticket);
            }
            this.body = '欢迎订阅';
        }
        else if (message.Event === 'unsubscribe') {
            console.log('取关');
            this.body = '';
        }
        else if (message.Event === 'LOCATION') {
            this.body = '经度：' + message.Latitude + '/n纬度：' + message.Longitude + '/n精度：' + message.Precision;
        }
        else if (message.Event === 'CLICK') {
            this.body = '点击菜单：' + message.EventKey;
        }
        else if (message.Event === 'SCAN') {
            console.log('关注后扫二维码：' + message.EventKey + ' ' + message.Ticket);
            this.body = '扫了次二维码';
        }
        else if (message.Event === 'VIEW') {
            this.body = '点击了菜单：' + message.EventKey;
        }
        else if (message.Event === 'scancode_push') {
            console.log(message.ScanCodeInfo.ScanType);
            console.log(message.ScanCodeInfo.ScanResult);
            this.body = '点击了菜单：' + message.EventKey;
        }
        else if (message.Event === 'scancode_waitmsg') {
            console.log(message.ScanCodeInfo.ScanType);
            console.log(message.ScanCodeInfo.ScanResult);
            this.body = '点击了菜单：' + message.EventKey;
        }
        else if (message.Event === 'pic_sysphoto') {
            console.log(message.SendPicsInfo.Count);
            console.log(message.SendPicsInfo.PicList);
            this.body = '点击了菜单：' + message.EventKey;
        }
        else if (message.Event === 'pic_photo_or_album') {
            console.log(message.SendPicsInfo.Count);
            console.log(message.SendPicsInfo.PicList);
            this.body = '点击了菜单：' + message.EventKey;
        }
        else if (message.Event === 'pic_weixin') {
            console.log(message.SendPicsInfo.Count);
            console.log(message.SendPicsInfo.PicList);
            this.body = '点击了菜单：' + message.EventKey;
        }
        else if (message.Event === 'location_select') {
            console.log(message.SendLocationInfo.Location_X);
            console.log(message.SendLocationInfo.Location_Y);
            console.log(message.SendLocationInfo.Scale);
            console.log(message.SendLocationInfo.Label);
            console.log(message.SendLocationInfo.Poiname);
            this.body = '点击了菜单：' + message.EventKey;
        }
    }
    else if(message.MsgType === 'text') {
        var content = message.Content;
        var reply = reply = [{
            title: 'Node.js CN',
            description: '基于 Chrome V8，事件驱动、非阻塞式 I/O 模型，开源生态库npm',
            picUrl: 'https://i.imgur.com/aPhnYLB.jpg',
            url: 'http://nodejs.cn/'
        },{
            title: 'Node.js API CN',
            description: 'Node.js 中文开发文档',
            picUrl: 'https://i.imgur.com/1AAoPmf.png',
            url: 'http://nodejs.cn/api/'
        }]
        if (content === '1') {
            reply = '你好'
        }
        else if (content === '2') {
            reply = '谢谢'
        }
        else if (content === '3') {
            reply = '再见'
        }
        this.body = reply;
    }
    yield next;
}