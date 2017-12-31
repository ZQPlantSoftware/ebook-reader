import jApi from '../utils/api'

export async function change (action) {
    return jApi('theme/change', {
        method: 'post'
    }, action.data)
}
