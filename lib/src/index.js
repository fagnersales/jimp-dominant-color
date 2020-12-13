const Jimp = require('jimp')

const areSimilarColors = require('./areSimilarColors')

/**
 * Gets the dominant color from an image
 * @param {String|Jimp} url Url for the image or a jimp image
 * @param {Number} [range=5] The range of similar colors
 * @param {Boolean} [preview=false] Weither it should create a preview image with the top 10 found colors
 * 
 */
async function dominantColor(url, range = 5, preview = false) {
    const jimp = typeof url === 'string' ? await Jimp.read(url) : url

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

    const colors = presentColors
        .sort((a, b) => b[1] - a[1])
        .filter(([_color, points]) => points > 10)
        .reduce((acc, [color, points]) => {
            const colorKey = Object.keys(acc).find(colorKey => areSimilarColors(colorKey, color, range))
            if (colorKey) return { ...acc, [colorKey]: acc[colorKey] += points }
            else return { ...acc, [color]: points }
        }, {})

    const TOP_TEN_COLORS = Object
        .keys(colors)
        .map(key => [+key, colors[key]])
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

    if (preview) {

        for (let i = 0; i < 10; i++) {
            for (let horizontal = 0; horizontal < 250; horizontal++) {
                for (let vertical = 0; vertical < 250; vertical++) {
                    const color = TOP_TEN_COLORS[i][0]
                    previewColorsImage.setPixelColor(color, 10 + i * 25 + horizontal, 10 + i * 25 + vertical)
                }
            }
        }

        previewColorsImage.writeAsync('previewImage.png')

    }

    return Jimp.intToRGBA(TOP_TEN_COLORS[0][1])
}


module.exports = dominantColor