const { faker } = require('@faker-js/faker')
const { join } = require('path')
const { writeFile } = require('fs/promises')
const Car = require('./../src/entities/car')
const CarCategory = require('./../src/entities/carCategory')
const Customer = require('./../src/entities/customer')

const seederBaseFolder = join(__dirname, "../", "database")
const ITEMS_ANOUNT = 2

const carCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []

for(let index = 0; index <= ITEMS_ANOUNT; index++) {
    const car = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })

    carCategory.carIds.push(car.id)
    cars.push(car)

    const customer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        age: faker.random.numeric()
    })

    customers.push(customer)
}

async function write(filename, data) {
    await writeFile(join(seederBaseFolder, filename), JSON.stringify(data))
}

;(async () => {
    await write('cars.json', cars)
    await write('carCategory.json', [carCategory])
    await write('customer.json', customers)

    console.log(cars);
    console.log(carCategory);
})()
