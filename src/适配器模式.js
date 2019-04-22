class Adaptee {
    specificRequest() {
        return '德国标准插头'
    }
}
class Target {
    constructor () {
        this.adaptee = new Adaptee()
    }
    request() {
        let info = this.adaptee.specificRequest()
        return `${info} - 转换器 - 中国标准插头`
    }
}
let target = new Target()
let res = target.request()
console.log(res)



// 自己封装的ajax，支持Promise
ajax({
    url: '/getData',
    type: 'post',
    dataType: 'json',
    data: {
        id: '123'
    }
}).done(() => { })
//因为历史原因，代码中全是：
// $.ajax({...})
//手动把所有旧的ajax者替换掉，也是不靠谱的，你不知道会踩到什么样的坑，所以就出现了，旧接口和现在的使用难以兼容的情况
// 做一层适配器，这个适配器做完之后，之前所有的程序中还可以使用$.ajax，但是这个$.ajax最终会走到上边的ajax，而并非原来的jQuery里边的ajax，遇到这种情况要做一个适配器，尽量避免去改，尽量避免去全局替换
var $ = {
    ajax: function (options) {
        return ajax(options)
    }
}