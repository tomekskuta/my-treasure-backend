const generateMatrixFromTreasures = require('./generateMatrixFromTreasures')

describe('utils/getRevealedWithStatus/generateMatrixFromTreasures', () => {
    it('generate matrix from treasures coordinates', () => {
        const mockTreasures = [
            [2, 1],
            [3, 3],
            [1, 4],
        ]
        const mockMatrix = {
            0: [1, 2, 1, 2, 3],
            1: [2, 3, 2, 3, 'T'],
            2: [3, 'T', 3, 3, 3],
            3: [2, 3, 3, 'T', 3],
            4: [1, 2, 2, 3, 2],
        }

        const result = generateMatrixFromTreasures(mockTreasures)
        expect(result).toStrictEqual(mockMatrix)
    })

    it('generate matrix with empty fields if they are only next to fields with status 1 or another empty field', () => {
        const mockTreasures = [
            [3, 0],
            [4, 0],
            [4, 1],
        ]
        const mockMatrix = {
            0: [1, null, null, null, null],
            1: [2, 1, null, null, null],
            2: [3, 2, 1, null, null],
            3: ['T', 3, 2, 1, null],
            4: ['T', 'T', 3, 2, 1],
        }

        const result = generateMatrixFromTreasures(mockTreasures)
        expect(result).toStrictEqual(mockMatrix)
    })
})
