//多态
class People {
    constructor(name, house) {
        this.name = name
        this.house = house
    }
    saySomething() {

    }
}
class A extends People {
    constructor(name, house) {
        super(name, house)
    }
    saySomething() {
        alert('I am A')
    }
}
class B extends People {
    constructor(name, house) {
        super(name, house)
    }
    saySomething() {
        alert('I am B')
    }
}
class House {
    constructor(city) {
        this.city = city
    }
    showCity() {
        alert(`house in ${this.city}`)
    }
}
let aHouse = new House('beijing')
let a = new A('a', aHouse)
a.saySomething()
console.log(a)
let b = new B('b')
b.saySomething()