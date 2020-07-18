const superRequest = require('supertest')
const app = require('../../app')
const store = require('../../store')
const { actions } = require('../../store/games')

jest.mock('../../utils/generateTreasures')
const generateTreasures = require('../../utils/generateTreasures')

jest.mock('../../utils/getRevealedWithStatus')
const getRevealedWithStatus = require('../../utils/getRevealedWithStatus')

const mockTreasures = [
    [1, 3],
    [4, 4],
    [0, 1],
]
generateTreasures.mockImplementation(() => mockTreasures)

const mockRevealedFieldsWithStatus = [
    { coordinates: [2, 4], status: 2 },
    { coordinates: [4, 4], status: 'T' },
    { coordinates: [0, 3], status: 3 },
]
getRevealedWithStatus.mockImplementation(() => mockRevealedFieldsWithStatus)

describe('routes/game', () => {
    it('/POST - create game if userName is passed and get it in response', async () => {
        const userName = 'User'
        const res = await superRequest(app)
            .post('/game')
            .send({ userName })
            .set('Accept', 'application/json')

        expect(res.statusCode).toBe(201)
        expect(res.body.id).toBeTruthy()
        expect(res.body.userName).toBe(userName)
        expect(res.body.score).toBe(0)
        expect(res.body.finished).toBe(false)
        expect(res.body.revealedFields).toStrictEqual([])
    })

    it('/POST - get 400 status if userName is not passed or is not string', async () => {
        const res1 = await superRequest(app)
            .post('/game')
            .send({ userName: {} })
            .set('Accept', 'application/json')
        expect(res1.statusCode).toBe(422)

        const res2 = await superRequest(app)
            .post('/game')
            .send({ userName: '' })
            .set('Accept', 'application/json')
        expect(res2.statusCode).toBe(422)

        const res3 = await superRequest(app)
            .post('/game')
            .send({})
            .set('Accept', 'application/json')
        expect(res3.statusCode).toBe(422)
    })

    it('/GET - 404 status if there is no game id in request or there is no game of given id in app', async () => {
        const res = await superRequest(app)
            .get('/game')
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(404)
    })

    it('/GET - 403 status if there is game but it is finished', async () => {
        const newGameData = {
            id: 'first-game',
            userName: 'User',
        }
        const updateData = {
            id: newGameData.id,
            revealedFields: mockTreasures,
        }

        store.dispatch(actions.addGame(newGameData))
        store.dispatch(actions.updateGame(updateData))

        const res = await superRequest(app)
            .get('/game/first-game')
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(403)
    })

    it('/GET - get current game by gameId param if is not finished', async () => {
        const newGameData = {
            id: 'second-game',
            userName: 'User',
        }
        const updateData = {
            id: newGameData.id,
            revealedFields: [
                [2, 4],
                [4, 4],
                [0, 3],
            ],
        }
        store.dispatch(actions.addGame(newGameData))
        store.dispatch(actions.updateGame(updateData))

        const res = await superRequest(app)
            .get('/game/second-game')
            .set('Accept', 'application/json')

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBeTruthy()
        expect(res.body.userName).toBe(newGameData.userName)
        expect(res.body.score).toBe(1)
        expect(res.body.finished).toBe(false)
        expect(res.body.revealedFields).toStrictEqual(
            mockRevealedFieldsWithStatus
        )
    })
})
