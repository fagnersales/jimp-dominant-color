const rgba = int => [
    Math.floor(int / 256 / 256 / 256 % 256),
    Math.floor(int / 256 / 256 % 256),
    Math.floor(int / 256 % 256),
    int % 256
]

const getDiff = (a, b, range) => Math.abs(a - b) <= range
const getAlphaDiff = (a, b, range) => Math.abs(a - b) <= range

function areSimilarColors(colorA, colorB, range) {

    const first_color = rgba(colorA)
    const second_color = rgba(colorB)

    for (let i = 0; i < 3; i++)
        if (!getDiff(first_color[i], second_color[i], range)) return false

    if (!getAlphaDiff(first_color[3], second_color[3], range * 50)) return false        
    
    return true

}

module.exports = areSimilarColors