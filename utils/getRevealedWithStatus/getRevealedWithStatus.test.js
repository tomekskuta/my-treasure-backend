const getRevealedWithStatus = require('./index')

const mockMatrix = [
    [1, 2, 1, 2, 3],
    [2, 3, 2, 3, 'T'],
    [3, 'T', 3, 3, 3],
    [2, 3, 3, 'T', 3],
    [1, 2, 2, 3, 2],
]
const mockRevealedFields = [
    [1, 2],
    [3, 3],
    [0, 1],
]
const expectedResult = [
    { coordinates: [1, 2], status: 2 },
    { coordinates: [3, 3], status: 'T' },
    { coordinates: [0, 1], status: 2 },
]

describe('utils/getRevealedWithStatus', () => {
    it('get empty array if revealdField is empty or is not array, ', () => {
        const result1 = getRevealedWithStatus([], mockMatrix)
        const result2 = getRevealedWithStatus('i am array', mockMatrix)

        expect(result1).toStrictEqual([])
        expect(result2).toStrictEqual([])
    })

    it('get empty array if matrix is not array or if it has no 5 elements of proper shape', () => {
        const result1 = getRevealedWithStatus(mockRevealedFields, 'i am array')
        const result2 = getRevealedWithStatus(mockRevealedFields, undefined)

        expect(result1).toStrictEqual([])
        expect(result2).toStrictEqual([])
    })

    it('if some revealed field has incorrect shape omit it', () => {
        const result = getRevealedWithStatus(
            [
                mockRevealedFields[0],
                'i have proper shape, man',
                mockRevealedFields[2],
            ],
            mockMatrix
        )
        const expected = expectedResult.filter((_, index) => index !== 1)
        expect(result).toStrictEqual(expected)
    })

    it('get expected result with coordinates and status of every revealed field', () => {
        const result = getRevealedWithStatus(mockRevealedFields, mockMatrix)
        expect(result).toStrictEqual(expectedResult)
    })
})
