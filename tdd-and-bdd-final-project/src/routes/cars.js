const { once } = require('events')

function calculateFinalPrice(request, response) {
    response.write('contact us page')
    return response.end()
}

module.exports = { calculateFinalPrice }