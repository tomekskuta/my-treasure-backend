const { createSlice, createEntityAdapter } = require('@reduxjs/toolkit')
const getTime = require('date-fns/getTime')
const generateTreasures = require('../../utils/generateTreasures')
const getFinish = require('../../utils/getFinish')

const gamesAdapter = createEntityAdapter({
    selectId: (game) => game.id,
    sortComparer: (a, b) => {
        if (!a.finished) {
            return 1
        }
        return a.score - b.score
    },
})

const addGame = (state, action) => {
    const { id, userName } = action.payload
    const createdAt = getTime(new Date())
    const newGame = {
        id,
        userName,
        treasures: generateTreasures(),
        revealedFields: [],
        score: 0,
        finished: false,
        createdAt,
        updatedAt: createdAt,
    }
    return gamesAdapter.addOne(state, newGame)
}

const updateGame = (state, action) => {
    const { id, revealedFields } = action.payload
    const currentGame = state.entities[id]
    const newRevealedFields = currentGame.revealedFields.concat(revealedFields)

    const changes = {
        revealedFields: newRevealedFields,
        score: currentGame.score + 1,
        finished: getFinish(currentGame.treasures, newRevealedFields),
        updatedAt: getTime(new Date()),
    }
    gamesAdapter.updateOne(state, { id, changes })
}

const deleteGame = gamesAdapter.removeOne

const games = createSlice({
    name: 'games',
    initialState: gamesAdapter.getInitialState(),
    reducers: { addGame, updateGame, deleteGame },
})

const { reducer, actions } = games
const gamesSelectors = gamesAdapter.getSelectors((state) => state.games)

module.exports = { reducer, actions, gamesSelectors }
