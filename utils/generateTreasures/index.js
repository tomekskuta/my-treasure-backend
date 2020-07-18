const isEqual = require('lodash.isequal')

const generateCoordinate = () => Math.floor(Math.random() * 5)

const generateTreasure = (currentTreasures) => {
    const newTreasure = [generateCoordinate(), generateCoordinate()]
    const isTreasureUnique = currentTreasures.every(
        (currentTreasure) => !isEqual(currentTreasure, newTreasure)
    )
    // eslint-disable-next-line no-unused-vars
    return isTreasureUnique ? newTreasure : generateTreasure(currentTreasures)
}

const generateTreasures = () =>
    new Array(3).fill(null).reduce((acc) => {
        return [...acc, generateTreasure(acc)]
    }, [])

module.exports = generateTreasures
