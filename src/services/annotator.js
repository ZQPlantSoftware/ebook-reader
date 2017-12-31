import jApi from '../utils/api'

export async function getByUser(action) {
    return jApi('annotator/get', {
        method: 'get'
    }, action.data)
}

export async function del(action) {
    return jApi('annotator/del', {
        method: 'get'
    }, action.data)
}
