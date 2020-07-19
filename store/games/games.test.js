const { configureStore } = require('@reduxjs/toolkit')
const { reducer, actions, gamesSelectors } = require('./index')

jest.mock('../../utils/generateTreasures')
const generateTreasures = require('../../utils/generateTreasures')
const generateMatrix = require('../../utils/generateMatrix')

const store = configureStore({ reducer: { games: reducer } })
const { addGame, updateGame, deleteGame } = actions

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
const mockMatrix = generateMatrix(treasures)

describe('store/games', () => {
    it('can create new game', () => {
        store.dispatch(addGame(newGameIn))
        const newGame = gamesSelectors.selectById(
            store.getState(),
            newGameIn.id
        )

        expect(gamesSelectors.selectTotal(store.getState())).toBe(1)
        expect(newGame.id).toBe(newGameIn.id)
        expect(newGame.userName).toBe(newGameIn.userName)
        expect(newGame.matrix).toStrictEqual(mockMatrix)
        expect(newGame.revealedFields).toStrictEqual([])
        expect(newGame.score).toBe(0)
        expect(newGame.finished).toBe(false)
        expect(newGame.createdAt).toStrictEqual(newGame.updatedAt)
    })

    it('can update game with 3 new reavealed fields, different than treasures', () => {
        const revealedFields = [
            [2, 4],
            [4, 3],
            [0, 2],
        ]
        const payload = {
            id: newGameIn.id,
            revealedFields,
        }

        store.dispatch(updateGame(payload))

        const editedGame = gamesSelectors.selectById(
            store.getState(),
            newGameIn.id
        )

        expect(editedGame.revealedFields).toStrictEqual(revealedFields)
        expect(editedGame.score).toBe(1)
        expect(editedGame.finished).toBe(false)
        expect(editedGame.updatedAt).not.toBe(editedGame.createdAt)
    })

    it('can update game with 3 new revealed fields and finish the game', () => {
        const payload = {
            id: newGameIn.id,
            revealedFields: treasures,
        }

        store.dispatch(updateGame(payload))

        const editedGame = gamesSelectors.selectById(
            store.getState(),
            newGameIn.id
        )

        const areTreasuresInRevealsFields = treasures.every((treasure) =>
            editedGame.revealedFields.some(
                (field) => field[0] === treasure[0] && field[1] === treasure[1]
            )
        )
        expect(areTreasuresInRevealsFields).toBeTruthy()
        expect(editedGame.score).toBe(2)
        expect(editedGame.finished).toBe(true)
    })

    it('can delete game', () => {
        const deletedId = newGameIn.id
        store.dispatch(deleteGame(deletedId))
        expect(gamesSelectors.selectTotal(store.getState())).toBe(0)
    })

    it('are sorted finished from lowest score', () => {
        const steps = [
            {
                action: addGame,
                payload: newGameIn,
            },
            {
                action: addGame,
                payload: {
                    id: 'second-game',
                    userNama: 'Second user',
                },
            },
            {
                action: updateGame,
                payload: {
                    id: 'second-game',
                    revealedFields: [
                        [0, 1],
                        [3, 4],
                        [2, 5],
                    ],
                },
            },
            {
                action: addGame,
                payload: {
                    id: 'third-game',
                    userName: 'Third user',
                },
            },
            {
                action: updateGame,
                payload: {
                    id: 'third-game',
                    revealedFields: treasures,
                },
            },
            {
                action: updateGame,
                payload: {
                    id: 'second-game',
                    revealedFields: treasures,
                },
            },
            {
                action: updateGame,
                payload: {
                    id: 'first-game',
                    revealedFields: [
                        [0, 1],
                        [3, 4],
                        [2, 5],
                    ],
                },
            },
        ]

        steps.forEach(({ action, payload }) => store.dispatch(action(payload)))

        const areScoresSorted = gamesSelectors
            .selectAll(store.getState())
            .reduce(
                (acc, curr) => {
                    if (!acc[0]) {
                        return acc
                    }

                    return acc[1].id
                        ? [curr.score >= acc[1].score || !curr.finished, curr]
                        : [true, curr]
                },
                [true, {}]
            )[0]
        expect(areScoresSorted).toBeTruthy()
    })
})
