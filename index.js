const { dominantColor } = require('./lib')

const URL_FOR_IMAGE = 'https://cdn.discordapp.com/avatars/474407357649256448/0f215fa0163c2a30e4bcc4505e4161cd.png?size=512'

dominantColor(URL_FOR_IMAGE)
.then(console.log)