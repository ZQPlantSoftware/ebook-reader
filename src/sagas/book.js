import { takeLatest } from 'redux-saga'
import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { get, add, getFull, addFull, init } from '../services/book'

function* getBook (action) {
    try {
        const { jsonResult } = yield call(get, action)
        if( jsonResult.data ) {
            yield put({
                type: 'book/get/success',
                payload: jsonResult.data
            })
        } else {
            yield put({
                type: 'book/get/failed',
                message: {
                    msg: 'get null'
                }
            })
        }
    } catch(e) {
        yield put({
            type: 'book/get/failed',
            message: e
        })
    }
}

function* addBook(action) {
    try {
        const { jsonResult } = yield call(add, action)

        if( jsonResult.data ) {
            yield put({
                type: 'book/full/success',
                data: jsonResult.data
            })
            yield put({type: 'book/show'})
        } else {
            yield put({
                type: 'book/get/failed',
                data: {
                    msg: 'get null'
                }
            })
        }
    } catch(e) {
        yield put({
            type: 'book/get/failed',
            data: e
        })
    }
}

function* getFullBook(action) {
    try {
        const { jsonResult } = yield call(getFull, action)

        if( jsonResult.data ) {
            yield put({
                type: 'book/full/success',
                payload: jsonResult.data
            })
        } else {
            yield put({
                type: 'book/full/get/failed',
                message: {
                    msg: 'get null'
                }
            })
        }
    } catch(e) {
        yield put({
            type: 'book/full/get/failed',
            message: e
        })
    }
}

function* addFullBook(action) {
    try {
        const { jsonResult } = yield call(addFull, action)

        if( jsonResult.data ) {
            // alert("书籍生成成功! 图书ID:" + jsonResult.data.book.id)
            if (console)
                console.log("书籍生成成功! 图书ID:" + jsonResult.data.book.id)

            yield put({
                type: 'book/full/success',
                payload: jsonResult.data
            })
        } else {
            yield put({
                type: 'book/full/get/failed',
                message: {
                    msg: 'get null'
                }
            })
        }
    } catch(e) {
        yield put({
            type: 'book/full/get/failed',
            message: e
        })
    }
}

function* initBook(action) {
    try {
        const { jsonResult } = yield call(init, action)

        if(jsonResult.code === '10000') {
            console.warn("书籍信息未初始化，正在尝试初始化书籍信息...")
        }

        yield put({
            type: 'book/params/success',
            payload: jsonResult.data.params
        })
        yield put({
            type: 'book/full/success',
            payload: jsonResult.data.book
        })

        yield put({
            type: 'bookMarks/get',
            data: {
                user_id: params.uid,
                book_id: jsonResult.data.book.book.id
            }
        })

        yield put({type: 'book/show'})
    } catch (e) {
        console.log("init error:", e)
        switch(e.code) {
            case '403':
                yield put({
                    type: 'book/get/failed',
                    msg: "参数错误!!"
                })
                break
            case '404':
                yield put({
                    type: 'book/params/success',
                    payload: e.data.params
                })
                yield put({type: 'book/generate'})
                break
        }

    }
}

function* watchBookGet () {
    yield takeLatest('book/get', getBook)
}

function* watchBookAdd () {
    yield takeLatest('book/add', addBook)
}

function* watchBookGetFull () {
    yield takeLatest('book/full/get', getFullBook)
}

function* watchBookAddFull () {
    yield takeLatest('book/full/add', addFullBook)
}

function* watchInit () {
    yield takeLatest('book/init', initBook)
}

export default function* () {
    yield fork(watchBookAdd)
    yield fork(watchBookGet)
    yield fork(watchBookGetFull)
    yield fork(watchBookAddFull)
    yield fork(watchInit)

    if( params.r ) {
        yield put({
            type: 'book/init',
            data: {
                r: params.r
            }
        })
    }

    // if( params.bid || params.url ) {
    //     let action = {
    //         type: 'book/full/get',
    //         data: {}
    //     }
    //
    //     params.bid && (action.data.id = params.bid)
    //     params.url && (action.data.url = params.url)
    //
    //     yield put(action)
    // }
}
