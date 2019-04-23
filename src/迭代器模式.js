class Iterator {
    constructor(container) {
        this.list = container.list
        // 默认成0
        this.index = 0
    }
    next() {
        if (this.hasNext()) {
            // 如果还有下一项，直接去return当前这一项，把index++
            return this.list[this.index++]
        }
        return null
    }
    // 判断是否还有下一项
    hasNext() {
        // 说明已经到头了，和判断数组的遍历是一样的
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}
class Container {
    constructor(list) {
        this.list = list
    }
    // 生成遍历器
    getIterator() {
        return new Iterator(this)
    }
}

//test
var arr = [1, 2, 3, 4, 5]
let container = new Container(arr)
let iterator = container.getIterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}


// ES6 Iterator
// 迭代器模式有个特点，就是不知道data内部结构或者说是长度
// 不知道data的长度肯定不能一直next，所以说你要通过一个while
// 循环去做
function each(data) {
    // 生成遍历器
    let iterator = data[Symbol.iterator]()

    // 有数据时返回{value: 1, done: false}
    // console.log(iterator.next())
    // console.log(iterator.next())
    // console.log(iterator.next())
    // console.log(iterator.next())
    // 没有数据时返回{value: undefined, done: true}
    // console.log(iterator.next())
    // console.log(iterator.next())
    // console.log(iterator.next())
    // console.log(iterator.next())

    // 先给done一个false
    let item = { done: false }
    // 如果没有结束，一上来肯定没有结束
    while (!item.done) {
        // 给iterator.next()的返回值，给它先赋一个默认值为false，进while循环之后item就会赋值成真正的iterator.next()
        item = iterator.next()
        if (!item.done) {
            console.log(item.value)
        }
    }
}

let arr = [1, 2, 3, 4]
let nodeList = document.getElementsByTagName('p')
let m = new Map()
m.set('a', 100)
m.set('b', 200)

each(arr)
each(nodeList)
each(m)




// 'Symbol.iterator' 并不是人人都知道
// 也不是每个人都需要封装一个 each方法
// 因此有了 'for...of'语法
function each(data) {
    // for...in 是我们平常用的比较多的一个语法，
    // 一般是遍历对象的
    // for...of 是遍历迭代器的，就是说这个data必须具有Symbol.iterator这个属性才能执行for...of
    // 这三行代码其实就是我们之前演示的那一堆代码的一个简写，你可能用过for...of，但是你可能没有用过我们说的这个iterator，但是如果你用了for...of你就已比对用了iterator
    // 带有遍历器特性的对象 : data[Symbol.iterator] 有值
    for(let item of data) {
        console.log(item)
    }
}

let arr = [1, 2, 3, 4]
let nodeList = document.getElementsByTagName('p')
let m = new Map()
m.set('a', 100)
m.set('b', 200)

each(arr)
each(nodeList)
each(m)
