import { app } from "@/app"
import request from 'supertest'
import { defaultDateMock } from "../utils/default-date"
import { defaultUserData } from "../utils/default-user-data"

describe('Register (e2e)', () => {
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

    it('should be able to register user', async () => {
        defaultDateMock()

        const response = await request(app.server)
        .post('/register')
        .send(defaultUserData())

        expect(response.statusCode).toEqual(201)
        expect(response.body.user).toEqual(
            expect.objectContaining({
                id: expect.any(String)
            })
        )
    })
})