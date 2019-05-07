// 状态(红灯，绿灯，黄灯)
class State {
    constructor(color) {
        this.color = color
    }
    // 这里的context 就是 Context 的一个实例
    handle(context) {
        console.log(`turn to ${this.color} light`)
        // this就是当前class的一个实例
        // 设置状态
        context.setState(this)
    }
}

// 主体
class Context {
    constructor() {
        this.state = null
    }
    // 获取状态
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
    }
}

// test
let context = new Context()

let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')

//绿灯亮了
green.handle(context)
console.log(context.getState()) // 打印状态

yellow.handle(context)
console.log(context.getState())

red.handle(context)
console.log(context.getState())



// 通过es6的模块化引用过来
import StateMachine from 'javascript-state-machine'
import $ from 'jquery'
// 有限状态机 - "收藏" 和 "取消"
// 状态机模型

// 初始化状态机模型
let fsm = new StateMachine({
    init: '收藏', //初始化状态
    // transitions是个数组，要查看不同状态之间的变化
    // 状态的变化
    transitions: [
        // 第一个状态，执行doStore的时候就从收藏到取消收藏
        // 注意：名字要对应好
        {
            name: 'doStore', //执行收藏
            from: '收藏',
            to: '取消收藏'
        },
        {
            name: 'deleteStore',
            from: '取消收藏',
            to: '收藏'
        }
    ],
    // 监听函数
    methods: {
        // 监听执行收藏
        // onDoStore 这里的名字和上边状态的名字要对应好on + 上边状态的名字，驼峰命名方式，要D要大写
        onDoStore: function () {
            alert('收藏成功') // 可以 post 请求
            updateText()
        },
        // 监听取消收藏
        onDeleteStore: function () {
            alert('已经取消收藏')
            updateText()
        }
    }
})
// 这里我安装了jquery，如果没装可以用原始的方法
// let btn = document.getElementById('btn1')
let $btn = $('#btn1')
// 按扭点击事件
$btn.click(function () {
    if (fsm.is('收藏')) {
        fsm.doStore()
    } else {
        fsm.deleteStore()
    }
})
// 更新按扭的文案
function updateText() {
    // fsm.state获取当前更新的状态
    $btn.text(fsm.state)
}

// 初始化文案
updateText()




//Promise
// 通过es6的模块化引用过来
import StateMachine from 'javascript-state-machine'

// 状态机模型
let fsm = new StateMachine({
    init: 'pending', // 初始化状态，Promise初始状态是pending
    // 状态变化，是一个数组
    transitions: [
        // 第一个状态，从pending到fullfilled，这是一个Promise状态变化的标准
        {
            name: 'resovle', // 事件名称
            from: 'pending',
            to: 'fullfilled'
        },
        // 第二个状态，从pending到rejected，这是一个Promise状态变化的标准
        {
            name: 'reject', // 事件名称
            form: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        // 监听resolve
        // state - 当前状态机实例
        // data - 执行上边resolve两个事件传递的参数，其实就是fsm.resolve(xxx)传递的参数，data接收的就是xxx，就是MyPromise返回的实例
        onResovle: (state, data) => {
            data.succesList.forEach(fn => fn())
        },
        // 监听reject
        // data - reject两个事件传递的参数，其实就是fsm.reject(xxx)传递的参数，data接收的就是xxx
        onReject: (state, data) => {
            data.failList.forEach(fn => fn())
        }
    }
})

// 定义Promise
class MyPromise {
    // 根据Promise机制，这里接收一个函数
    constructor(fn) {
        // 执行.then 的时候，两个函数肯定不会立马执行，按照定义，第一个函数都是在resolve触发的时候才执行，第二个函数都是reject触发的时候才执行，所以这要把 then 执行的两个函数先存起来
        this.succesList = []
        this.failList = []
        // 函数在执行的时候还要接收两个参数，resolve, reject，那我们要传入两个函数进去
        // 通过状态机来触发succesList failList里边的函数
        fn(() => {
            // resolve 函数
            // this就是当前Promise返回的实例
            // 这里的resolve就是状态机transitions里定义的name
            // 当我们执行resolve或reject的时候，状态机就会根据它的状态变化去变化状态，同时去触发监听函数，触发监听函数干嘛呢，触发监听函数无非就是想 resolve 的时候把 succesList 遍历出来，给它执行，reject的时候把 failList 遍历出来给它执行
            fsm.resovle(this)
        }, () => {
            // reject 函数
            fsm.reject(this)
        })
    }

    // 这里要接收两个参数，一个是succesFn，一个是failFn
    then(succesFn, failFn) {
        this.succesList.push(succesFn)
        this.failList.push(failFn)
    }
}

//test
function loadImg(src) {
    const promise = new MyPromise(function (resolve, reject) {
        let img = document.createElement('img')
        // img.onload成功的时候执行的是resolve
        img.onload = () => {
            resolve(img)
        }
        // img.onerror失败的时候执行的是reject
        img.onerror = () => {
            reject()
        }
        img.src = src
    })
    return promise
}

let src = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png'
// result就是Promise返回的实例
let result = loadImg(src)
//使用result
result.then(() => {
    console.log('ok1')
}, () => {
    console.log('file1')
})
// 这里也可以通过链式的方式直接去写，但是我们这实现的是一个Promise状态变化监听的功能，所有这的链式操作我们就先不要管了
result.then(() => {
    console.log('ok2')
}, () => {
    console.log('file2')
})