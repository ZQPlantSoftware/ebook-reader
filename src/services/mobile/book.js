import jApi from '../../utils/api'

export async function init (action) {
    return jApi('book/init', {
    // return jApi('http://172.20.10.2:8989/test/mock/init.json', {
        method: 'get'
    }, action.data)
}
