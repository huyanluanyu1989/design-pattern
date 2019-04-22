// 主题，保存状态，状态变化之后触发所有观察者对象
class Subject {
    constructor(state) {
        this.state = 0
        // 所有观察者，给它一个数组
        this.observers = []
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
        // 改完state之后，立刻会触发所有的观察者
        this.notifyAllObservers()
    }
    // 把当前所有的observers进行一个遍历
    notifyAllObservers() {
        this.observers.forEach(observers => {
            observers.update()
        })
    }
    // 添加新观察者，支持多个观察者
    attach(observer) {
        this.observers.push(observer)
    }
}

// 观察者
class Observer {
    // subject 就是Subject的一个对象或者实例
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        // 在初始观察者的最后，把它自己attch进去当前的主题中来
        this.subject.attach(this)
    }
    //为什么要弄一个subject呢，因为我们当触发观察者的update之后，我们想把subject的state打印出来
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

// 先初始化一个主题
let subject = new Subject()

// 定义一个观察者
let o1 = new Observer('o1', subject)
let o2 = new Observer('o2', subject)
let o3 = new Observer('o3', subject)
// 对主题进行修改,每一次setState的时候都会触发所有观察者
subject.setState(1)
subject.setState(2)
subject.setState(3)


//Promise
function loadimg(url) {
    let promise = new Promise(function (resolve, reject) {
        let img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject('图片加载失败')
        }
        img.src = url
    })
    return promise
}
let src = 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_86d58ae1.png'
let result = loadimg(src)
result.then(function (img) {
    // part1
    alert(`width ${img.width}`)
    return img
}).then(function (img) {
    // part2
    alert(`height ${img.height}`)
}).catch(function (ex) {
    alert('图片加载失败')
})