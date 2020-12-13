const { dominantColor } = require('./lib')

const URL_FOR_IMAGE = 'https://cdn.discordapp.com/avatars/617739561488875522/f404695b5d2a94bfdff7fea7f0a6868a.png?size=2048'

dominantColor(URL_FOR_IMAGE, 10, false)
.then(console.log)