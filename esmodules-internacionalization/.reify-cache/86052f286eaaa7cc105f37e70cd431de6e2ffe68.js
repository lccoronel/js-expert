"use strict";var expect;module.link("chai",{expect(v){expect=v}},0);var Person;module.link("../src/persons.js",{default(v){Person=v}},1);


describe('Persons', () => {
    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString('1 Bike,Carro 10000 2021-01-01 2021-01-10')

        const expected = {
            from: '2021-01-01',
            to: '2021-01-10',
            vehicles: ['Bike', 'Carro'],
            kmTraveled: '10000',
            id: '1'
        }

        expect(person).to.be.deep.equal(expected)
    })

    it('should format values', () => {
        const person = new Person({
            from: '2021-01-01',
            to: '2021-01-10',
            vehicles: ['Bike', 'Carro'],
            kmTraveled: '10000',
            id: '1'
        })

        const result = person.formatted('pt-br')

        const expected = {
            id: 1,
            vehicles: 'Bike e Carro',
            kmTraveled: '10.000 km',
            from: '01 de janeiro de 2021',
            to: '10 de janeiro de 2021',
        }

        expect(result).to.be.deep.equal(expected)
    })
})