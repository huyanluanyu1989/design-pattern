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