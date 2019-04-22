@testDec //对class进行了一个装饰
//首先要定义一个类
class Demo {
    //里边可以不写什么东西
    // ...
}
// 定义一个函数，传一个target进去，在Demo类的上边加一个@testDec,就把函数名字给写上，这就是一个装饰器，也就是说函数是一个装饰器，我们通过这种语法把class给装饰一遍
// target就是class Demo
function testDec(target) {
    target.isDec = true
}
alert(Demo.isDec) // true

//装饰器的原理
@decorator
class A {}
//等同于
class A {}
A = decorator(A) || A

// Demo
function testDec (isDec) {
    return function (target) {
        target.isDec = isDec
    }
}

@testDec(false)
class Demo {

}
alert(Demo.isDec)


// 装饰类 - mixin示例
function mixins(...list) {
    return function (target) {
        // 把target.prototype和list进行一个混合，把Foo里的属性合并到target.prototype上去
        Object.assign(target.prototype, ...list)
    }
}
const Foo = {
    foo() {
        alert('foo')
    }
}
// 把Foo对象传进去
@mixins(Foo)
class MyClass {

}
let obj = new MyClass()
obj.foo()


// 装饰方法
function readonly(target, name, descriptor) {
    // descriptor 属性描述对象（Object.definePrototype中会用到），原来的值如下
    // {
    //     value: specifiedFunction,
    //     enumerable: false, //可枚举
    //     cinfigurable: true, //可配置
    //     writable: true // 可写
    // }
    // /对name进行装饰的时候，把可写关闭
    descriptor.writable = false
    return descriptor
}
class Person {
    constructor() {
        this.firstName = 'A'
        this.lastName = 'B'
    }
    // 装饰方法
    @readonly
    name() {
        console.log(`${this.firstName} ${this.lastName}`)
    }
}
const p = new Person()
// p.name = function() {
//     alert(`${this.firstName} ${this.lastName}`)
// }
p.name()


function log(target, name, descriptor) {
    // 先把函数获取到
    let oldValue = descriptor.value
    // 把这个函数重新赋值成一个函数
    descriptor.value = function () {
        console.log(`calling ${name} width`, arguments)
        // 执行原本的函数,把arguments传进去
        return oldValue.apply(this, arguments)
    }
    return descriptor
}
class Math {
    @log
    add(a, b) {
        return a + b
    }
}
let math = new Math()
// 这里的add已经不是原来的add了，而是经过装饰后的console.log(`calling ${name} width`, arguments)
const res = math.add(2, 4)
console.log(res)

// 第三方库core-decorators
// 第一个例子
import { readonly } from 'core-decorators'

class Person {
    @readonly
    name() {
        return 'zhang san'
    }
}

let p = new Person()
alert(p.name())
// p.name = function () {
//     return 'li si'
// }

// 第二个例子
import { deprecate } from 'core-decorators'

class Person {
    // @deprecate
    // 将提示符传入装饰器
    // @deprecate('即将弃用')
    // 将地址传入装饰器，提示可以去地址查看更多信息
    // deprecate.js:31 DEPRECATION Person#name: 即将弃用
    // See www.mic.com for more details.
    @deprecate('即将弃用', { url: 'www.mic.com' })
    name() {
        return 'zhangsan'
    }
}
let p = new Person()
p.name()