const getFinish = require('./index')

const treasures = [
    [1, 2],
    [4, 0],
    [2, 2],
]

describe('utils/getFinish', () => {
    it('game is not finished, if no field is revealed', () => {
        expect(getFinish(treasures, [])).toBe(false)
    })

    it('game is not finish if there is some common field', () => {
        const revealedFields = [[1, 0], [3, 3], treasures[1]]
        expect(getFinish(treasures, revealedFields)).toBe(false)
    })

    it('game is finish if every treasures fields are in revealed array', () => {
        const revealedFields = [
            [1, 0],
            treasures[1],
            [4, 4],
            treasures[2],
            treasures[0],
        ]
        expect(getFinish(treasures, revealedFields)).toBe(true)
    })
})
