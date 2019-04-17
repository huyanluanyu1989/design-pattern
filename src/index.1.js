class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`${this.name} age is ${this.age}`)
    }
}
let zhang = new Person('Zhang', 30)
zhang.eat()
zhang.speak()
let jia = new Person('Jia', 30)
