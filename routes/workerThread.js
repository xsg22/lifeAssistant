const {parentPort} = require("worker_threads");
const { WechatyBuilder } = require('wechaty');
const robotPlatform = require('../robot/robotPlatform');
const talkStrategy = require('../robot/talkStrategy');

parentPort.on("message", () => {
    const bot = WechatyBuilder.build({
        name: 'lifeAssistant-' + new Date().getTime(),
        puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
        puppetOptions: {
            uos: true
        }
    })

    bot.on('scan', (qrcode, status) => {
        const qrcodeImageUrl = [
            'https://api.qrserver.com/v1/create-qr-code/?data=',
            encodeURIComponent(qrcode),
        ].join('');

        parentPort.postMessage(qrcodeImageUrl);
    });
    bot.on('login', async function onLogin(user) {
        robotPlatform.registerRobot(user, this)
    });
    bot.on('logout', function onLogin(user) {
        robotPlatform.unregisterRobot(user, this);
        // 退出的时候销毁线程
        parentPort.emit("close");
    });
    bot.on('message', async (msg) => {
        console.log("msg:", JSON.stringify(msg));
        talkStrategy.doChain(msg)
    });

    bot.start()
        .then(() => console.log('开始登陆微信'))
        .catch((e) => console.error(e));
});


