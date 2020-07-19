const generateMatrix = require('./index')

describe('utils/generateMatrix', () => {
    it('generate matrix from treasures coordinates', () => {
        const mockTreasures = [
            [2, 1],
            [3, 3],
            [1, 4],
        ]
        const mockMatrix = [
            [1, 2, 1, 2, 3],
            [2, 3, 2, 3, 'T'],
            [3, 'T', 3, 3, 3],
            [2, 3, 3, 'T', 3],
            [1, 2, 2, 3, 2],
        ]

        const result = generateMatrix(mockTreasures)
        expect(result).toStrictEqual(mockMatrix)
    })

    it('generate matrix with empty fields if they are only next to fields with status 1 or another empty field', () => {
        const mockTreasures = [
            [3, 0],
            [4, 0],
            [4, 1],
        ]
        const mockMatrix = [
            [1, null, null, null, null],
            [2, 1, null, null, null],
            [3, 2, 1, null, null],
            ['T', 3, 2, 1, null],
            ['T', 'T', 3, 2, 1],
        ]

        const result = generateMatrix(mockTreasures)
        expect(result).toStrictEqual(mockMatrix)
    })
})
