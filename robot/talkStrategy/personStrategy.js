const path = require("path");
const robotPlatform = require("../robotPlatform");
const PUPPET = require("wechaty-puppet");

async function doOcr(msg) {
    const file = await msg.toFileBox();
    const fileName = "tmp/" + file.name;
    console.log("get file", fileName);
    await file.toFile(fileName, true);
    const fullPath = path.resolve(fileName);
    return await robotPlatform.getOcr(fullPath)
}

async function doChain(msg) {
    if (msg.type() === PUPPET.types.Message.Image) {
        const reply = await doOcr(msg);
        await delay(1000);
        await msg.say(reply);
    }
}


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    doChain
}