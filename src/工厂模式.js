class Product {
    constructor(name) {
        this.name = name
    }
    init() {
        alert('init')
    }
    fun1() {
        alert('fun1')
    }
    fun2() {
        alert('fun2')
    }
}
//把真正的构造函数给封装起来
class Creator {
    create(name) {
        return new Product(name)
    }
}

//测试
//先生成一个工厂，通过工厂模式将真正的构造函数和使用者隔离开，让创建实例的时候有一个统一的入口
let creator = new Creator()
//工厂通过create函数创建这个Product
//在外部使用时不用管真正的构造函数是谁
let p = creator.create('p1')
p.init()
p.fun1()
p.fun2()




//实例演示
class jQuery {
    constructor(seletor) {
        let slice = Array.prototype.slice
        //dom节点不是一个数组形式，通过slice.call返回的就是一个数组
        let dom = slice.call(document.querySelectorAll(seletor))
        let len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            //把dom的每个元素都复制到实例的属性里边去
            this[i] = dom[i]
        }
        this.length = len
        this.seletor = seletor || ''
    }
    append(node) {

    }
    addClass(name) {

    }
    html(data) {

    }
}
window.$ = function (seletor) {
    // 工厂模式
    return new jQuery(seletor)
}
var $p = $('p')
console.log($p)
console.log($p.addClass)