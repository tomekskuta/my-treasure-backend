const { createSlice } = require('@reduxjs/toolkit')
const getTime = require('date-fns/getTime')
const generateTreasures = require('../../utils/generateTreasures')
const getFinish = require('../../utils/getFinish')

const addGame = (state, action) => {
    const { id, userName } = action.payload
    const createdAt = getTime(new Date())
    const newGame = {
        id,
        userName,
        treasures: generateTreasures(),
        revealedFields: [],
        movesCount: 0,
        finished: false,
        createdAt,
        updatedAt: createdAt,
    }
    return state.concat(newGame)
}

const updateGame = (state, action) => {
    const { id, revealedFields } = action.payload
    const updatedState = state.map((game) => {
        const newRevealedFields = game.revealedFields.concat(revealedFields)
        return game.id === id
            ? Object.assign({}, game, {
                  revealedFields: newRevealedFields,
                  movesCount: game.movesCount + 1,
                  finished: getFinish(game.treasures, newRevealedFields),
                  updatedAt: getTime(new Date()),
              })
            : game
    })
    return updatedState
}

const deleteGame = (state, action) => {
    const deletedId = action.payload
    return state.filter((game) => game.id !== deletedId)
}

const games = createSlice({
    name: 'games',
    initialState: [],
    reducers: { addGame, updateGame, deleteGame },
})

module.exports = games
