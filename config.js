'use strict'

var path = require('path');
var util = require('./libs/util');
var wechat_file = path.join(__dirname, './config/wechat.txt');
var config = {
    wechat: {
        appID: 'wx1123de12e17b1fd3',
        appSecret: 'df109d3003ea7595c3a129aab7e26f15',
        token: 'eloRqkCn4ZXFUhII7xdSxsmy39gCVuq',
        getAccessToken: function () {
            return util.readFileAsync(wechat_file)
        },
        setAccessToken: function (data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data)
        }
    }
}

module.exports = config;