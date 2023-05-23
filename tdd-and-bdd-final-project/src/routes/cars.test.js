const { describe, it, after, before } = require('mocha')
const request = require('supertest')
const assert = require('assert')
const Api = require('../api')

const TEST_PORT = 4000

describe('Cars Routes Tests', () => {
    let app 

    before(() => {
        const api = new Api()
        app = {
            instance: api,
            server: api.initialize(TEST_PORT)
        }
    })

    it('should return a calaculated final price and HTTP status 200', async () => {
        const response = await request(app.server)
            .post('/calculateFinalPrice')
            .expect(200)
    })
})