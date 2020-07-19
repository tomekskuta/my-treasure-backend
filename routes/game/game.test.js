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
    it('POST - create game if userName is passed and get it in response', async () => {
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

    it('POST - get 400 status if userName is not passed or is not string', async () => {
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

    it('GET - 404 status if there is no game id in request or there is no game of given id in app', async () => {
        const res = await superRequest(app)
            .get('/game')
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(404)
    })

    it('GET - 403 status if there is game but it is finished', async () => {
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

    it('GET - get current game by gameId param if is not finished', async () => {
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

    it('PATCH - 422 status if there is no correct body', async () => {
        const reqBody1 = {
            id: 0,
            revealedFields: [],
        }
        const res1 = await superRequest(app)
            .patch('/game')
            .send(reqBody1)
            .set('Accept', 'application/json')
        expect(res1.statusCode).toBe(422)

        const reqBody2 = {}
        const res2 = await superRequest(app)
            .patch('/game')
            .send(reqBody2)
            .set('Accept', 'application/json')
        expect(res2.statusCode).toBe(422)

        const reqBody3 = { id: 'test-id', revealedFields: ['asdas', [1, 2]] }
        const res3 = await superRequest(app)
            .patch('/game')
            .send(reqBody3)
            .set('Accept', 'application/json')
        expect(res3.statusCode).toBe(422)

        const reqBody4 = {
            id: 'test-id',
            revealedFields: [
                [1, 2],
                [2, 3],
                [1, 3],
                [4, 2],
            ],
        }
        const res4 = await superRequest(app)
            .patch('/game')
            .send(reqBody4)
            .set('Accept', 'application/json')
        expect(res4.statusCode).toBe(422)

        const reqBody5 = {
            id: 'test-id',
            revealedFields: [
                [1, 2],
                [3, 6],
                [2, 4],
            ],
        }
        const res5 = await superRequest(app)
            .patch('/game')
            .send(reqBody5)
            .set('Accept', 'application/json')
        expect(res5.statusCode).toBe(422)
    })

    it('PATCH - 404 status if there is no game of given id', async () => {
        const reqBody = {
            id: 'test-id-wich-never-exist',
            revealedFields: [
                [1, 2],
                [3, 3],
                [2, 4],
            ],
        }
        const res = await superRequest(app)
            .patch('/game')
            .send(reqBody)
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(404)
    })

    it('PATCH - 200 status and not finished. get: id, userName, score, revealedFields, finished', async () => {
        const id = 'patch-200-game-not-finished'
        const newGame = { id, userName: 'User' }
        const reqBody = {
            id,
            revealedFields: [
                [1, 2],
                [3, 3],
                [2, 4],
            ],
        }

        store.dispatch(actions.addGame(newGame))

        const res = await superRequest(app)
            .patch('/game')
            .send(reqBody)
            .set('Accept', 'application/json')

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(id)
        expect(res.body.userName).toBe(newGame.userName)
        expect(res.body.score).toBe(1)
        expect(res.body.finished).toBe(false)
        expect(res.body.revealedFields).toStrictEqual(
            mockRevealedFieldsWithStatus
        )
    })

    it('PATCH - 200 status and finished. get: id, userName, score, finished, revealedFields, top 10 scores', async () => {
        const id = 'patch-200-game-finished'
        const newGame = { id, userName: 'User' }
        const reqBody = {
            id,
            revealedFields: mockTreasures,
        }

        store.dispatch(actions.addGame(newGame))

        const res = await superRequest(app)
            .patch('/game')
            .send(reqBody)
            .set('Accept', 'application/json')

        const { topScores } = res.body
        const areTopScores =
            Array.isArray(topScores) &&
            topScores.length < 11 &&
            topScores.reduce(
                (acc, curr) => {
                    return !acc[0] ||
                        !acc[1] ||
                        (typeof curr === 'object' && curr.score >= acc[1].score)
                        ? [true, curr]
                        : [false, curr]
                },
                [true, null]
            )[0]

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(id)
        expect(res.body.userName).toBe(newGame.userName)
        expect(res.body.score).toBe(1)
        expect(res.body.finished).toBe(true)
        expect(res.body.revealedFields).toStrictEqual(
            mockRevealedFieldsWithStatus
        )
        expect(areTopScores).toBeTruthy()
    })
})
