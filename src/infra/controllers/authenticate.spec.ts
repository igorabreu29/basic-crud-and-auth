import { app } from "@/app"
import request from "supertest"
import { defaultUserData } from "../utils/default-user-data"
import { defaultDateMock } from "../utils/default-date"

describe('Authenticate (e2e)', () => {
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

    it('should be able to authenticate user', async () => {
        defaultDateMock()

        await request(app.server)
        .post('/register')
        .send(defaultUserData())

        const response = await request(app.server)
        .post('/auth')
        .send({
            email: 'john@john.com',
            password: '202020'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.objectContaining({
                token: expect.any(String)
            })
        )
    })
})