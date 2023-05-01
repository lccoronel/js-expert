const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const assert = require('assert')

const sinon = createSandbox()


;(async () => {
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        for(const sequency of fibonacci.execute(5)) {}

        const expectedCallCount = 6
        const { args } = spy.getCall(2)
        const expectedParams = [3, 1, 2]

        assert.strictEqual(spy.callCount, expectedCallCount)
        assert.deepStrictEqual(args, expectedParams)
    }
    {
        const fibonacci = new Fibonacci()
        const spy = sinon.spy(fibonacci, fibonacci.execute.name)

        const results = [...fibonacci.execute(3)]

        const expectedCallCount = 4
        const expectedResults = [0, 1, 1]

        assert.strictEqual(spy.callCount, expectedCallCount)
        assert.deepStrictEqual(results, expectedResults)
    }
})()