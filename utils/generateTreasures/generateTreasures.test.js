const isEqual = require('lodash.isequal')
const generateTreasures = require('./index')

describe('utils/generateTreasures', () => {
    const treasures = generateTreasures()

    it('is array with 3 elements', () => {
        expect(Array.isArray(treasures)).toBeTruthy()
        expect(treasures.length).toBe(3)
    })

    it('every element is array with 2 elements', () => {
        const isEveryElementArrayWithTwoElements = treasures.every(
            (treasure) => Array.isArray(treasure) && treasure.length === 2
        )
        expect(isEveryElementArrayWithTwoElements).toBeTruthy()
    })

    it('every coordinate in every treasure is integer between 0 and 4', () => {
        const isEveryCoordinateProperNumber = treasures.every((treasure) =>
            treasure.every(
                (coordinate) =>
                    Number.isInteger(coordinate) &&
                    coordinate >= 0 &&
                    coordinate < 5
            )
        )
        expect(isEveryCoordinateProperNumber).toBeTruthy()
    })

    it('every treasure is on different posiiton', () => {
        const uniqueTreasures = treasures.reduce(
            (acc, curr) =>
                acc.some((el) => isEqual(el, curr)) ? acc : [...acc, curr],
            []
        )
        expect(uniqueTreasures.length).toBe(3)
    })

    it('two generated treasures are different', () => {
        const firstTreasures = generateTreasures()
        const secondTreasures = generateTreasures()

        expect(firstTreasures).not.toStrictEqual(secondTreasures)
    })
})
