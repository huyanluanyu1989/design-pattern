// 用java的方式演示单例模式
public class SingleObject {
    // 注意，私有化构造函数，外部不能new，只能内部能new!!!
    private SingleObject() {
    }
    // 唯一被new出来的对象
    // 定义一个属性，被赋值为null，这个属性的类型为SingleObject，因为java是一个强类型的语言，所以我们不能用var、let来定义，只能用强类型定义
    private SingleObject instance = null
    // 获取对象的唯一接口
    // 定义了一个public方法
    public SingleObject getInstance() {
        if (instance == null) {
            // 只能new一次
            instance = new SingleObject()
        }
        return instance
    }
}

public void login(username, password) {
    System.out.println('login...')
}

public class SingletonPatternDemo {
    public static void main(String[] args) {
        // 不合法的构造函数
        // 编绎时出错：构造函数SingleObject()是不可见的！！！
        // SingleObject object = new SingleObject()

        // 获取唯一可用以象
        SingleObject object = SingleObject.getInstance()
        objcet.login()
    }
}


// js中单例模式的应用
class SingleObject {
    login() {
        console.log('login...')
    }
}
// 无论实例new多少个，只有一个静态的方法
SingleObject.getInstance = (function () {
    // 用闭包
    let instance
    return function () {
        if(!instance) {
            instance = new SingleObject()
        }
        return instance
    }
})()
// 测试：注意这里只能使用静态函数getInstance，靠文档去约束，不能new SingleObject()!!!
let obj1 = SingleObject.getInstance()
obj1.login()
let obj2 = SingleObject.getInstance()
obj2.login()
console.log(obj1 === obj2) // true 两者完全相等
console.log('-----分割线-----')
let obj3 = new SingleObject() // 是我们无法完全控制
console.log(obj1 === obj3)// false

//jQuery 只有一个$
if(window.jQuery != null) {
    return window.jQuery
}else {
    // 初始化...
}

//模拟登录框
class loginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示')
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
}

loginForm.getInstance = (function () {
    let instance
    return function () {
        if (!instance) {
            instance = new loginForm()
        }
        return instance
    }
})()
let login1 = loginForm.getInstance()
login1.show()
let login2 = loginForm.getInstance()
// login1.show()
login2.hide()
console.log(login1 === login2)