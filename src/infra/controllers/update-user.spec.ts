import { app } from "@/app"
import request from 'supertest'
import { defaultDateMock } from "../utils/default-date"
import { defaultUserData } from "../utils/default-user-data"

describe('Update User (e2e)', () => {
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

    it('should be able to update user', async () => {
        defaultDateMock()

        const responseRegister = await request(app.server)
            .post('/register')
            .send(defaultUserData())
        const userId = responseRegister.body.user.id

        const response = await request(app.server)
            .put(`/update-user/${userId}`)
            .send(defaultUserData())

        expect(response.statusCode).toEqual(200)
        expect(response.body.user).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: 'John',
                lastname: 'Doe',
                email: 'john@john.com',
                password: expect.any(String)
            })
        )
    })
})