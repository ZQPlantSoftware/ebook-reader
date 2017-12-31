import { takeLatest } from 'redux-saga'
import { take, put, call, fork } from 'redux-saga/effects'
import { getAll, add, del } from '../../services/bookMarks'

function* getBookMark(action) {
    try {
        const { jsonResult } = yield call(getAll, action)

        if(jsonResult.data) {
            yield put({
                type: 'bookMarks/get/success',
                payload: jsonResult.data
            })
        }
    } catch(e) {
        yield put({
            type: 'bookMarks/get/failed',
            message: e
        })
    }
}

function* addBookMark(actions) {
    try {
        const { jsonResult } = yield call(add, actions)

        if(jsonResult.code === '200') {
            yield put({
                type: 'bookMarks/get',
                data: {
                    user_id: params.uid,
                    book_id: params.bid
                }
            })
        }
    } catch(e) {
        yield put({
            type: 'bookMarks/add/failed',
            message: e
        })
    }
}

function* delBookMark(action) {
    try {
        const { jsonResult } = yield call(del, action)

        if(jsonResult) {
            yield put({
                type: 'bookMarks/get'
            })
        }

    } catch(e) {
        yield put({
            type: 'bookMarks/del/failed',
            message: e
        })
    }
}

function* watchBookMarkGet() {
    yield takeLatest('bookMarks/get', getBookMark)
}

function* watchBookMarkAdd() {
    yield takeLatest('bookMarks/add', addBookMark)
}

function* watchBookMarkDel() {
    yield takeLatest('bookMarks/del', delBookMark)
}

export default function* () {
    yield fork(watchBookMarkGet)
    yield fork(watchBookMarkAdd)
    yield fork(watchBookMarkDel)

    // Load bookMarks
    // yield put({
    //     type: 'bookMarks/get'
    // })
}
