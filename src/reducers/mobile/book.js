import { handleActions } from 'redux-actions'

const book = handleActions({
    ['book/init/success'] (state, action) {
        let book = action.payload.book
        let paramsNow = action.payload.params

        let locations = book.pages.map(next => {
            return next.cfi
        })

        params.bid = book.book.id
        let paramsNew = { ...params, ...paramsNow }
        window.params = paramsNew

        let after =  { ...state,
            params: paramsNew,
            details: book.book,
            pageList: book.pages,
            spint: book.spint,
            locations: locations,
            metadata: book.metadata,
            // page: {
            //     ...state.page,
            //     totalPages: book.pages.length
            // }
        }

        return after
    },
    ['book/init/failed'] (state, action) {
        return state
    },
    // 显示
    ['book/show'] (state, action) {
        return { ...state, mount: true, loading: false }
    },
    // toc生成成功
    ['book/toc/success'] (state, action) {
        return {
            ...state,
            toc: action.data
        }
    },
    ['book/page'] (state, action) {
        let outOfProbation = false

        if (state.params.probation+1 < action.data.currentPercentage) {
            outOfProbation = true
        }

        return {
            ...state,
            pagination: {
                ...state.pagination,
                ...action.data
            },
            outOfProbation
        }
    },
    ['book/currentToc'] (state, action) {
        return {
            ...state,
            currentToc: action.payload
        }
    }

}, {
    loading: true,
    mount: false,
    toc: [],
    pageList: [],
    locations: [],
    params: {
        bid: null,
        uid: null,
        url: null,
        probation: -1
    },
    metadata: {
        book_title: '欢迎使用方正EPUB阅读器'
    },
    pagination: {
        // totalPages: 0,
        // currentPage: 0,
        currentPercentage: 1
    },
    outOfProbation: false,
    currentToc: {}
})

export default book
