const { once } = require('events')
const http = require('http')

const DEFAULT_USER = { username: 'Lucas', password: '123' }

function toLower(text) {
    return text.toLowerCase()
}

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page')
        return response.end()
    },
    '/login:post': async (request, response) => {
        const user = JSON.parse(await once(request, "data"))
        
        const isInvalidUsername = toLower(user.username) !== toLower(DEFAULT_USER.username)
        const isInvalidPassword = user.password !== DEFAULT_USER.password

        if (isInvalidUsername || isInvalidPassword) {
            response.writeHead(401)
            response.end("loggin failed")
            return
        }

        return response.end('ok')
    },
    default(request, response) {
        response.writeHead(404)
        return response.end('not found!')
    }
}

function handler(request, response) {
    const { url, method } = request
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default

    return chosen(request, response)
}

const app = http
    .createServer(handler)
    .listen(3000, () => console.log('running at 3000'))

module.exports = app
