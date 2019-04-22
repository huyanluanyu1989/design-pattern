// 网页事件代理
class ReadImg {
    constructor(filename) {
        this.filename = filename
        this.loadFormDisk() // 初始化即从硬盘中加载，模拟
    }
    display() {
        console.log('display... ' + this.filename)
    }
    loadFormDisk() {
        console.log('loading... ' + this.filename)
    }
}

// 代理
class ProxyImg {
    constructor(filename) {
        // 初始化一个realImg
        this.realImg = new ReadImg(filename)
    }
    // 此处做了一个代理
    display() {
        // 实际上执行的是ReadImg里的display
        this.realImg.display()
    }
}

// test
let proxyImg = new ProxyImg('1.png')
proxyImg.display()

//ES6 proxy
//明星
let star = {
    name: '张xx',
    age: 25,
    phone: '13900008888'
}

// 经纪人
//把要代理的对象传进去
let agent = new Proxy(star, {
    // target要代理的对象，key 要get的属性的值
    get: (target, key) => {
        // 代理的接口和原对象要一致
        if (key === 'phone') {
            // 返回经纪人自己的电话
            return 'agent_:13711116868'
        }
        if (key === 'price') {
            // 明星不报价，经纪人报价
            return 120000
        }
        return target[key]
    },
    set: (target, key, val) => {
        if (key === 'customPrice') {
            if (val < 100000) {
                // 最低100000 alert或console都可以
                throw new Error('价格太低')
            } else {
                // 赋值
                target[key] = val
                return true
            }
        }
    }
})

// test
console.log(agent.name, agent.age, agent.phone, agent.price)
// 给经纪人报个价
agent.customPrice = 150000
// agent.customPrice = 80000
console.log(`agent.customPrice: ${agent.customPrice}`)