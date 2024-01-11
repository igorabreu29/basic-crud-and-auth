import { app } from "@/app"
import request from "supertest"
import { defaultUserData } from "../utils/default-user-data"
import { defaultDateMock } from "../utils/default-date"

describe('Fetch Users (e2e)', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    beforeAll(async () => {
        await app.ready()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to fetch all users', async () => {
        defaultDateMock()

        await request(app.server)
            .post('/register')
            .send(defaultUserData())

        await request(app.server)
            .post('/register')
            .send(defaultUserData({
                name: 'Mariazinha',
                lastname: 'Nova',
                gender: "feminíno",
                birth: '12/07/2001',
                address: 'Rua Nova',
                age: 21,
                father: 'João Nova',
                mother: 'Joana Nova',
                email: 'maria@test.com',
                password: 'novanova'
            }))

        const response = await request(app.server)
            .get('/users')
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.users).toEqual([
            expect.objectContaining({
                id: expect.any(String),
                name: 'John',
                lastname: 'Doe',
                gender: 'masculino',
                age: 21
            }),
            expect.objectContaining({
                id: expect.any(String),
                name: 'Mariazinha',
                lastname: 'Nova',
                gender: 'feminíno',
                age: 21
            })
        ])
    })
})