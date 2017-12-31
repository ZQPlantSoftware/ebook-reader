import { handleActions } from 'redux-actions'

const annotator = handleActions({
    ['annotator/get/success'] (state, action) {
        return { ...state, annotator:action.payload }
    },
    ['annotator/get/failed'] (state, action) {
        return { ...state, message: action.message }
    }
}, {
    annotator: []
})

export default annotator
