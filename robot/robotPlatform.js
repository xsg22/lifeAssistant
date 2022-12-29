// const chatGptPlugin = require("chatGptPlugin");
const tianXingPlugin = require("./platform/tianXingPlugin");
const superagent = require("../httpApi/httpClient");
const HealthAssistantUrl = 'http://localhost:8080/api/ocr/recognition';

function registerRobot(user, robot) {
    console.log(`机器人${user.name()}(${user.id})登录,实例名称为:${robot.name()}`)
}
function unregisterRobot(user, robot) {
    console.log(`机器人${user.name()}(${user.id})登出,实例名称为:${robot.name()}`)
}

async function getOcr(filePath) {
    try {
        let res = await superagent.upload({url: HealthAssistantUrl, filePath});
        return `体重：${res.weight}；BMI：${res.bmi}；体脂：${res.bodyFat}`;
    } catch (err) {
        console.log('获取每日一句出错', err);
        return err;
    }
}

module.exports = {
    getOcr,
    // ...chatGptPlugin,
    ...tianXingPlugin,
    registerRobot,
    unregisterRobot
}