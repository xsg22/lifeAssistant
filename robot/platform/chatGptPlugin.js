// import { ChatGPTAPIBrowser } from 'chatgpt'
//
// async function talk(word) {
//     // use puppeteer to bypass cloudflare (headful because of captchas)
//     const api = new ChatGPTAPIBrowser({
//         email: '**',
//         password: '**',
//         executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
//     })
//
//     await api.initSession()
//
//     const result = await api.sendMessage(word)
//     console.log(result.response)
//     return result.response;
// }
//
// module.exports = {
//     talk
// }
