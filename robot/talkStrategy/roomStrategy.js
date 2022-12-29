const robotPlatform = require("../robotPlatform");

async function doChain(msg) {
    const mentionSelf = await msg.mentionSelf();
    if (mentionSelf) {
        const mentionText = await msg.mentionText();
        const reply = await robotPlatform.talk(mentionText);
        await msg.say(reply)
    }
}

module.exports = {
    doChain
}