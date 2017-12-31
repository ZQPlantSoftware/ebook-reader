import { handleActions } from 'redux-actions'

const bookMarks = handleActions({
    ['bookMarks/get/success'](state, action) {
        return { ...state, bookMarks:action.payload, loading:false }
    },
    ['bookMarks/get/failed'](state, message) {
        return { ...state, message: message, loading:false }
    }
}, {
    bookMarks: [],
    loading: false,
})

export default bookMarks
