'use strict'

module.exports = {
    "button": [{
        "type": "click",
        "name": "今日歌曲",
        "key": "V1001_TODAY_MUSIC"
    }, {
        "name": "主菜单1",
        "sub_button": [{
            "type": "view",
            "name": "Node.js",
            "url": "http://nodejs.cn/"
        }, {
            "type": "scancode_push",
            "name": "扫码事件",
            "key": "scancode_push",
        }, {
            "type": "scancode_waitmsg",
            "name": "扫码推送中",
            "key": "scancode_waitmsg"
        }, {
            "type": "pic_sysphoto",
            "name": "系统相机",
            "key": "pic_sysphoto"
        }, {
            "type": "pic_photo_or_album",
            "name": "拍照或者相册发图",
            "key": "pic_photo_or_album"
        }]
    }, {
        "name": "主菜单2",
        "sub_button": [{
            "type": "pic_weixin",
            "name": "弹出微信相册发图器的事件推送",
            "key": "pic_weixin"
        }, {
            "type": "location_select",
            "name": "弹出地理位置选择器的事件推送",
            "key": "location_select",
        }]
    }]
}