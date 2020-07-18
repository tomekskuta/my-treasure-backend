const { configureStore } = require('@reduxjs/toolkit')
const gamesStore = require('./index')

jest.mock('../../utils/generateTreasures')
const generateTreasures = require('../../utils/generateTreasures')

const store = configureStore({ reducer: gamesStore.reducer })
const { addGame, updateGame, deleteGame } = gamesStore.actions

const treasures = [
    [1, 3],
    [4, 4],
    [0, 1],
]
generateTreasures.mockImplementation(() => treasures)

const newGameIn = {
    id: 'first-game',
    userName: 'Test Name',
}

describe('store/games', () => {
    it('has initial state', () => {
        expect(store.getState()).toStrictEqual([])
    })

    it('can create new game', () => {
        store.dispatch(addGame(newGameIn))
        const newGame = store.getState()[0]

        expect(store.getState().length).toBe(1)
        expect(newGame.id).toBe(newGameIn.id)
        expect(newGame.userName).toBe(newGameIn.userName)
        expect(newGame.treasures).toStrictEqual(treasures)
        expect(newGame.revealedFields).toStrictEqual([])
        expect(newGame.movesCount).toBe(0)
        expect(newGame.finished).toBe(false)
        expect(newGame.createdAt).toStrictEqual(newGame.updatedAt)
    })

    it('can update game with 3 new reavealed fields, different than treasures', () => {
        const revealedFields = [
            [2, 4],
            [4, 3],
            [0, 1],
        ]
        const payload = {
            id: newGameIn.id,
            revealedFields,
        }

        store.dispatch(updateGame(payload))

        const editedGame = store.getState()[0]

        expect(editedGame.revealedFields).toStrictEqual(revealedFields)
        expect(editedGame.movesCount).toBe(1)
        expect(editedGame.finished).toBe(false)
        expect(editedGame.updatedAt).not.toBe(editedGame.createdAt)
    })

    it('can update game with 3 new revealed fields and finish the game', () => {
        const payload = {
            id: newGameIn.id,
            revealedFields: treasures,
        }

        store.dispatch(updateGame(payload))

        const editedGame = store.getState()[0]

        const areTreasuresInRevealsFields = treasures.every((treasure) =>
            editedGame.revealedFields.some(
                (field) => field[0] === treasure[0] && field[1] === treasure[1]
            )
        )
        expect(areTreasuresInRevealsFields).toBeTruthy()
        expect(editedGame.movesCount).toBe(2)
        expect(editedGame.finished).toBe(true)
    })

    it('can delete game', () => {
        const deletedId = newGameIn.id

        store.dispatch(deleteGame(deletedId))

        expect(store.getState()).toStrictEqual([])
    })
})
