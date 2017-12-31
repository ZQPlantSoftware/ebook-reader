import { handleActions } from 'redux-actions'

const theme = handleActions({
    ['theme/change/success'] (state, action) {
        let theme = Object.assign({}, state.theme, action.payload)
        localStorage.setItem('theme', JSON.stringify(theme))
        return { ...state, theme: theme }
    }
}, {
    theme: { textSize: 14, lineHeight: 16 },
    themes: [
        {
            id: 1,
            title: '标准',
            color: '#000',
            backgroundColor: '#f6f4ec'
        }, {
            id: 2,
            title: '清漾青',
            color: '#E08031',
            backgroundColor: '#376956'
        }, {
            id: 3,
            title: '艾利斯兰',
            color: '#000',
            backgroundColor: '#DDF0ED'
        }
        // , {
        //     id: 4,
        //     title: '珊瑚朱',
        //     color: '#fff',
        //     backgroundColor: '#f17c67'
        // }, {
        //     id: 5,
        //     title: '淡麒麟色',
        //     color: '#fff',
        //     backgroundColor: '#EEE8AB'
        // },
    ]
})

export default theme
