const superagent = require('../../httpApi/httpClient');
const {machineIdSync} = require('node-machine-id');
const crypto = require('crypto');
let md5 = crypto.createHash('md5');
let uniqueId = md5.update(machineIdSync()).digest('hex'); // 获取机器唯一识别码并MD5，方便机器人上下文关联

const TxUrl = 'http://api.tianapi.com/txapi/';
const TxToken = 'a928b6bcbd76928af1e9d94a5ddbf0bc';


// 天行对接的图灵机器人
async function getTXTLReply(word) {
    let url = TxUrl + 'tuling/';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: TxToken,
            question: word,
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let response = content.newslist[0].reply;
        console.log('天行对接的图灵机器人:', content);
        return response;
    } else {
        return '我好像迷失在无边的网络中了，接口调用错误：' + content.msg;
    }
}

// 天行聊天机器人
async function talk(word) {
    let url = 'https://apis.tianapi.com/robot/index';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: TxToken,
            question: word,
            mode: 0,
            datatype: 0,
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let res = content.result
        let response = '';
        if (res.datatype === 'text') {
            response = res.reply
        } else if (res.datatype === 'view') {
            response = `虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br>《${content.newslist[0].title}》${content.newslist[0].url}`
        }  else if (res.datatype === 'image') {
            response = `这是一个图片${res.reply}`
        } else {
            response = '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题';
        }
        return response;
    } else {
        return '我好像迷失在无边的网络中了，你能找回我么';
    }
}

async function getSweetWord() {
    // 获取土味情话
    let url = TxUrl + 'saylove/';
    try {
        let content = await superagent.req({url, method: 'GET', params: {key: TxToken}});
        if (content.code === 200) {
            let sweet = content.newslist[0].content;
            let str = sweet.replace('\r\n', '<br>');
            return str;
        } else {
            return '你很像一款游戏。我的世界'
        }
    } catch (err) {
        console.log('获取接口失败', err);
    }
}

module.exports = {
    talk,
    getSweetWord,
    getTXTLReply
};
