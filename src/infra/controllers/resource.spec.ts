import { app } from "@/app"
import request from "supertest"
import { defaultUserData } from "../utils/default-user-data"
import { defaultDateMock } from "../utils/default-date"

describe('Resource (e2e)', () => {
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

    it('should be able to receive true if user have a valid token', async () => {
        defaultDateMock()

        await request(app.server)
            .post('/register')
            .send(defaultUserData())

        const responseAuthenticate = await request(app.server)
            .post('/auth')
            .send({
                email: 'john@john.com',
                password: '202020',
            })

        const { token } = responseAuthenticate.body

        const response = await request(app.server)
            .get('/resource')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(true)
    })
})