const item = {
    name: 'Lucas Coronel',
    age: 26,
    toString: () => {
        return `Name: ${this.name}, Age: ${this.age}`
    },
    valueOf: () => {
        return 007
    },
    [Symbol.toPrimitive](coercionType) {
        console.log('try to convert to', coercionType);

        const types = {
            string: JSON.stringify(this),
            number: '007'
        }

        return types[coercionType]
    }
}

console.log('ola'.valueOf());
console.log(Number(item));
