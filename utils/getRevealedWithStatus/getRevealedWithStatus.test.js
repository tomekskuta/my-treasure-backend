const getRevealedWithStatus = require('./index')

const mockTreasures = [
    [1, 3],
    [4, 4],
    [0, 1],
]
const mockRevealedFields = [
    [1, 2],
    [3, 1],
    [0, 1],
]
const expectedResult = [
    { coordinates: [1, 2], status: 3 },
    { coordinates: [3, 1], status: 1 },
    { coordinates: [0, 1], status: 'T' },
]

describe('utils/getRevealedWithStatus', () => {
    it('get empty array if revealdField is empty or is not array, ', () => {
        const result1 = getRevealedWithStatus([], mockTreasures)
        const result2 = getRevealedWithStatus('i am array', mockTreasures)

        expect(result1).toStrictEqual([])
        expect(result2).toStrictEqual([])
    })

    it('get empty array if treasures is not array or if it has no 3 elements of proper shape', () => {
        const result1 = getRevealedWithStatus(mockRevealedFields, 'i am array')
        const result2 = getRevealedWithStatus(mockRevealedFields, [])
        const result3 = getRevealedWithStatus(mockRevealedFields, [
            mockTreasures[0],
            [],
            mockTreasures[2],
        ])

        expect(result1).toStrictEqual([])
        expect(result2).toStrictEqual([])
        expect(result3).toStrictEqual([])
    })

    // it('if some revealed field has incorrect shape omit it', () => {
    //     const result = getRevealedWithStatus(
    //         [
    //             mockRevealedFields[0],
    //             'i have proper shape, man',
    //             mockRevealedFields[2],
    //         ],
    //         mockTreasures
    //     )
    //     const expected = expectedResult.filter((_, index) => index !== 1)
    //     expect(result).toStrictEqual(expected)
    // })

    // it('get expected result with coordinates and status of every revealed field', () => {
    //     const result = getRevealedWithStatus(mockRevealedFields, mockTreasures)
    //     expect(result).toStrictEqual(expectedResult)
    // })
})
