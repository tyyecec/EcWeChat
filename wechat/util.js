'use strict'

var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./tpl');

exports.parseXMLAsync = function (xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, { trim: true }, function (err, content) {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        })
    })
}

function formatMessage(result) {
    var message = {};
    if (typeof result === 'object') {
        var keys = Object.keys(result);
        for (var i = 0; i < keys.length; i++) {
            var item = result[keys[i]];
            var key = keys[i];
            if (item.length === 0 || !(item instanceof Array)) {
                continue;
            } else if (item.length === 1) {
                var val = item[0];
                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                for (var j = 0; j < item.length; j++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }
    return message;
}

exports.formatMessage = formatMessage;

exports.tpl = function (content, message) {
    var info = {};
    var msgType = 'text';
    var toUserName = message.ToUserName;
    var fromUserName = message.FromUserName;
    if (Array.isArray(content)) {
        msgType = 'news';
    }
    msgType = content.type || msgType;
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = msgType;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;

    return tpl.compiled(info);
}