import { handleActions } from 'redux-actions'

const book = handleActions({
    ['book/search/toggle'] (state, action) {
        let $body = $($('iframe')[0].contentDocument).find('body')
        $body.unhighlight()

        if (action.searchStr && action.searchStr.trim().length > 0) {
            $body.highlight(action.searchStr, { element: 'span' })
        }

        return { ...state, searchStr: action.searchStr }
    },
    ['book/ctf/change'] (state, action) {
        if (state.searchStr && state.searchStr.trim().length > 0) {
            let $body = $($('iframe')[0].contentDocument).find('body')
            $body.unhighlight()
            $body.highlight(state.searchStr, { element: 'span' })
        }
        return { ...state, cfi: action.cfi, page: { ...state.page, ...action.page }}
    },
    ['book/readingType/toggle'] (state, action) {
        let newrt = (state.readingType === 'h' ? 'v' : 'h')
        let newState = { ...state, readingType: newrt }
        newState.chapter.height = window.frames[0].document.body.clientHeight + 150
        return newState
    },
    ['book/height/new'] (state, action) {
        return { ...state, chapter: { ...state.chapter, height: window.frames[0].document.body.clientHeight + 150 }}
    },
    // ['book/get/success'] (state, action) {
    //     return { ...state, details: action.payload, loading: !action.payload, message: action.payload ? null: "图书信息加载中,请稍后" }
    // },
    ['book/generate'] (state, action) {
        //TODO 这里需要优化
        return { ...state, mount: true, loading: false, msg: "正在构建图书目录信息，请稍后..." }
    },
    ['book/show'] (state, action) {
        return { ...state, mount: true, loading: false }
    },
    ['book/get/failed'] (state, action) {
        return { ...state, message: action.msg, loading: true }
    },
    ['book/add/failed'] (state, action) {
        return { ...state, message: "书籍加载出错", loading: true }
    },
    ['book/full/success'] (state, action) {
        let locations = action.payload.pages.map(next => {
            return next.cfi
        })

        params.bid = action.payload.book.id

        return { ...state,
            params: {...state.params, bid: action.payload.book.id, url: action.payload.book.url},
            details: action.payload.book,
            pageList: action.payload.pages,
            spint: action.payload.spint,
            locations: locations,
            metadata: action.payload.metadata,
            page: {
                ...state.page,
                totalPages: action.payload.pages.length
            }
        }
    },
    ['book/params/success'] (state, action) {
        window.params = { ...params, ...action.payload }
        return { ...state, params: action.payload }
    },
    ['book/chapter/loaded'] (state, action) {
        return { ...state, chapter: { ...state.chapter, ...action.data} }
    },
    ['book/probation/loaded'] (state, action) {
        let newState = { ...state }
        newState.probation = action.data.probation
        return newState
    },
    ['book/probation/object'] (state, action) {
        return { ...state, probationObject: action.payload }
    },
    ['bookMarks/add/processing'](state) {
        return { ...state, inProcess: true }
    },
    ['bookMarks/add/success'](state) {
        return { ...state, inProcess: false}
    }
}, {
    searchStr: '',
    loading: true,
    inProcess: false,
    mount: false,
    message: null,
    params: {
        bid: null,
        uid: null,
        url: null,
        probation: -1
    },
    cfi: '',
    readingType: 'h',
    probation: null,
    probationObject: {},
    details: {
        id: null,
        url: null,
        totalPages: 0
    },
    pageList: [],
    locations: [],
    spint: [],
    metadata: {
        title: '加载中...'
    },
    page: {
        totalPages: 0,
        currentPage: 0,
        currentLocation: null,
        currentPercentage: 0,
        spinePos: null,
        outOfProbation: false,
        currentToc: {
            id: null,
            label: null
        },
        page: {}                  //EPUBJS 原生page对象
    },
    chapter: {
        height: 500
    }
})

export default book
