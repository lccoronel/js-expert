const http = require('http')
const { calculateFinalPrice } = require('./routes/cars')

const DEFAULT_PORT = 3000

class Api {
    generateRoutes() {
        return {
            '/calculateFinalPrice:post': calculateFinalPrice,
            default(request, response) {
                response.writeHead(404)
                return response.end('not found!')
            }
        }
    }

    handler(request, response) {
        const { url, method } = request
        const routeKey = `${url}:${method.toLowerCase()}`
        const routes = this.generateRoutes()
        const chosen = routes[routeKey] || routes.default

        return chosen(request, response)
    }

    initialize(port = DEFAULT_PORT) {
        return http.createServer(this.handler.bind(this))
            .listen(port, () => console.log(`running at ${port}`))
    }
}

if (process.env.NODE_ENV !== 'test') {
    const api = new Api()
    api.initialize()
}

module.exports = Api
