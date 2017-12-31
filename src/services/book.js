import jApi from '../utils/api'

export async function get (action) {
    return jApi('book/get', {
        method: 'get'
    }, action.data)
}

export async function add (action) {
    return jApi('book/add', {
        method: 'get'
    }, action.data)
}

export async function getFull (action) {
    return jApi('book/getFull', {
        method: 'get'
    }, action.data)
}

export async function init (action) {
    return jApi('book/init', {
        method: 'get'
    }, action.data)
}

export async function toSearch (action) {
    return jApi('search/s', {
        method: 'get'
    }, action.data)
}

export async function addFull (action) {
    if(action.data.spines) {
        let filter = action.data.spines.map(next => {
            return {
                cfi: next.cfi,
                cfi_base: next.cfiBase,
                href: next.href,
                s_index: next.index,
                s_linear: next.linear,
                url: next.url,
                book_id: next.book_id
            }
        })
        action.data.spines = filter
    }

    if(action.data.height) {
        let filter = action.data.pages.map(next => {
            return {
                ...next,
                height: action.data.height
            }
        })
        action.data.pages = filter
    }

    if(action.data.metadata) {
        action.data.metadata = { ...action.data.metadata, book_title: action.data.metadata.bookTitle }
    }

    return jApi('book/addFull', {
        method: 'post'
    }, action.data)
}
