const Jimp = require('jimp')

/**
 * Gets the dominant color from an image
 * @param {String|Jimp} - Url for the image or a jimp image
 */
async function dominantColor(url) {
    const jimp = await Jimp.read(url)

    const [width, height] = [jimp.getWidth(), jimp.getHeight()]

    const presentColors = []
    
    for (let horizontal_pixel = 0; horizontal_pixel < width; horizontal_pixel++) {
        for (let vertical_pixel = 0; vertical_pixel < height; vertical_pixel++) {
            const pixelColor = jimp.getPixelColor(horizontal_pixel, vertical_pixel)
            
            const finderByColor = ([color, _points]) => color === pixelColor

            const savedValue = presentColors.find(finderByColor)

            if (savedValue) {
                const savedValueIndex = presentColors.findIndex(finderByColor)
                presentColors[savedValueIndex] = [pixelColor, savedValue[1] + 1]
            } else {
                presentColors.push([pixelColor, 1])
            }
            
        }
    }


    const previewColorsImage = new Jimp(500, 500)

    const TOP_TEN_COLORS = presentColors.sort((a, b) => b[1] - a[1]).slice(0, 10)

    for (let i = 0; i < 10; i++) {
        for (let horizontal = 0; horizontal < 250; horizontal++) {
            for (let vertical = 0; vertical < 250; vertical++) {
                const color = TOP_TEN_COLORS[i][0]
                previewColorsImage.setPixelColor(color, 10 + i*25+horizontal, 10 + i*25+vertical)
            }
        }
    }
    
    previewColorsImage.writeAsync('previewImage.png')

}


module.exports = dominantColor