import { app } from "@/app"
import request from "supertest"
import { defaultUserData } from "../utils/default-user-data"
import { defaultDateMock } from "../utils/default-date"

describe('Delete User (e2e)', () => {
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

    it('should be able to get profile user', async () => {
        defaultDateMock()

        const responseRegister = await request(app.server)
            .post('/register')
            .send(defaultUserData())
        const userId = responseRegister.body.user.id

        const response = await request(app.server)
            .delete(`/delete-user/${userId}`)
            .send()

        expect(response.statusCode).toEqual(203)
        expect(response.body.message).toEqual('User deleted with success!')
    })
})