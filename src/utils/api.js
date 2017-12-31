import xFetch from './xFetch'

// let baseUrl = 'http://www.qxcbs.com:9898/'
let baseUrl = 'http://localhost:9898/'
// let baseUrl = 'http://112.74.124.195:9898/'
// let baseUrl = 'http://192.168.0.102:9898/'
// let baseUrl = 'http://101.200.125.213:9898/'
// let baseUrl = 'http://182.92.11.96:9898/'
// let baseUrl = 'http://ww.csspw.cn:9898/'
// let baseUrl = 'http://www.csspw.cn:9898/'
// let baseUrl = 'http://10.0.65.106:9898/'
// let baseUrl = 'http://172.16.8.242:9898/'
// let baseUrl = 'http://we.csspw.cn/epub-services/'
// http://172.16.8.242/epub/?r={url:'694976304979361272.epub',probation:100,uid:1}
// 引入通用的请求头 拼接url
function jApi(url, options, data) {

    if(!options || !options.method)
        options = { ...options, method: 'get' }

    if(options && data && options.method === 'get')
        url = url + '?' + formatPostBody(data)

    if(options && data && options.method === 'post') {
        options.headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8'
        }
        options.body = JSON.stringify(data)
    }

    url = url.indexOf('http://') === 0 ? url : baseUrl + url

    return xFetch(url, options)
}

function formatPostBody(data) {
    let i, str = ''
    for(i in data) {
        str += i + '=' + encodeURI(data[i]) + '&'
    }
    return str
}

export default jApi
