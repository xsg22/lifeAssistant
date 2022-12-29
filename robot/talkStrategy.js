const personStrategy = require("./talkStrategy/personStrategy");
const roomStrategy = require("./talkStrategy/roomStrategy");

async function doChain(msg) {
    if (msg.self()) {
        return;
    }

    // 是否是群消息
    if (msg.room()) {
        await roomStrategy.doChain(msg);
    } else {
        await personStrategy.doChain(msg);
    }
}

module.exports = {
    doChain
}