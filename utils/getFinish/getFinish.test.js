const getFinish = require('./index')

const mockRevealedFields = [
    [1, 2],
    [3, 3], // T
    [0, 1],
    [2, 1], // T
    [1, 4], // T
    [1, 1],
]
const mockMatrix = [
    [1, 2, 1, 2, 3],
    [2, 3, 2, 3, 'T'],
    [3, 'T', 3, 3, 3],
    [2, 3, 3, 'T', 3],
    [1, 2, 2, 3, 2],
]

describe('utils/getFinish', () => {
    it('game is not finished, if no field is revealed or fields are not array', () => {
        expect(getFinish([], mockMatrix)).toBe(false)
        expect(getFinish(null, mockMatrix)).toBe(false)
    })

    it('game is not finish if there is no 3 treasures', () => {
        const notFinishedFields = mockRevealedFields.filter(
            (_, index) => index !== 1
        )
        expect(getFinish(notFinishedFields, mockMatrix)).toBe(false)
    })

    it('game is finished if every treasure field is in revealed array', () => {
        expect(getFinish(mockRevealedFields, mockMatrix)).toBe(true)
    })
})
