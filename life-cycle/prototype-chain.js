const assert = require('assert')

const obj = {}
const arr = []
const fn  = () => {}

// internamente, objetos literias viram  funçoes explicitas
console.log('new Object() is {}', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia do objeto que possui as  propiedades nele
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype);
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype);
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype);
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// o __proto__ de Object.prototype é null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null);

console.log('------------------------');

function Employee() {}
Employee.prototype.salary = () => "salary**"

function Supervisor() {}
// herda a instancia de Employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

// podemos chamar via prototype, mas se tentar chamar diretamente da erro
console.log(Manager.prototype.salary())

// se nao chamar 0 'new', o primeiro __proto__ vai ser sempre a instancia de functions, sem herdar nossas classes
// Para acessar as classes sem o new, pode acessar direto via prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)
console.log('------------------------');

// quando chamamos com o 'new' o __proto__ recebe o prototype
console.log("Manager.__proto__: %s,  manager.slary(): %s", new Manager().__proto__, new Manager().salary());
console.log('Supervisor.prototype === new Manager().__proto__.__proto__)', Supervisor.prototype === new Manager().__proto__.__proto__);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)