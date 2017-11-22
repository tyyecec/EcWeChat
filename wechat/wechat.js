'use strict'

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util');
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {
    accessToken: prefix + 'token?grant_type=client_credential',
    menu: {
        create: prefix + 'menu/create?',
        get: prefix + 'menu/get?',
        del: prefix + 'menu/delete?',
        current: prefix + 'get_current_selfmenu_info?'
    }
}

function Wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.setAccessToken = opts.setAccessToken;
    this.fetchAccessToken();
}

Wechat.prototype.fetchAccessToken = function () {
    var that = this
    return this.getAccessToken()
        .then(function (data) {
            try {
                data = JSON.parse(data)
            }
            catch (e) {
                return that.updateAccessToken()
            }
            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data)
            }
            else {
                return that.updateAccessToken()
            }
        })
        .then(function (data) {
            that.setAccessToken(data)
            return Promise.resolve(data)
        })
}

Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());
    if (now < expires_in) {
        return true;
    } else {
        return false;
    }
}

Wechat.prototype.updateAccessToken = function (data) {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function (resolve, reject) {
        request({
            url: url,
            json: true
        }).then(function (response) {
            var _data = response.body;
            if (_data) {
                var now = (new Date().getTime());
                var expires_in = now + (_data.expires_in - 20) * 1000;
                _data.expires_in = expires_in;
                resolve(_data);
            } else {
                throw new Error('==== err updateAccessToken() ====');
            }
        }).catch(function (err) {
            reject(err);
        })
    })
}

Wechat.prototype.reply = function () {
    var content = this.body;
    var message = this.weixin;
    var xml = util.tpl(content, message);

    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
}

Wechat.prototype.createMenu = function (menu) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.fetchAccessToken().then(function (data) {
            var url = api.menu.create + 'access_token=' + data.access_token;
            request({
                method: 'POST',
                url: url,
                body: menu,
                json: true
            }).then(function (response) {
                var _data = response.body;
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('==== err createMenu() ====');
                }
            }).catch(function (err) {
                reject(err);
            })
        })
    })
}

Wechat.prototype.getMenu = function (menu) {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.fetchAccessToken().then(function (data) {
            var url = api.menu.get + 'access_token=' + data.access_token;
            request({
                url: url,
                json: true
            }).then(function (response) {
                var _data = response.body;
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('==== err getMenu() ====');
                }
            }).catch(function (err) {
                reject(err);
            })
        })
    })
}

Wechat.prototype.delMenu = function () {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.fetchAccessToken().then(function (data) {
            var url = api.menu.del + 'access_token=' + data.access_token;
            request({
                url: url,
                json: true
            }).then(function (response) {
                var _data = response.body;
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('==== err delMenu() ====');
                }
            }).catch(function (err) {
                reject(err);
            })
        })
    })
}

Wechat.prototype.getCurrentMenu = function () {
    var that = this;
    return new Promise(function (resolve, reject) {
        that.fetchAccessToken().then(function (data) {
            var url = api.menu.current + 'access_token=' + data.access_token;
            request({
                url: url,
                json: true
            }).then(function (response) {
                var _data = response.body;
                if (_data) {
                    resolve(_data);
                } else {
                    throw new Error('==== err getCurrentMenu() ====');
                }
            }).catch(function (err) {
                reject(err);
            })
        })
    })
}

module.exports = Wechat;