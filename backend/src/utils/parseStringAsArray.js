module.exports = (arrayAsString) => {
    return arrayAsString.split(',').map(arrayItem => arrayItem.trim())
}