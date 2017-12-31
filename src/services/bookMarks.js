import jApi from '../utils/api'

export async function getAll(action) {
    return jApi('bookmark/get', {
        method: 'get'
    }, action.data)
}

export async function add(action) {
    return jApi('bookmark/add', {
        method: 'get'
    }, action.data)
}

export async function del(action) {
    return jApi('bookmark/del', {
        method: 'get'
    }, action.data)
}
