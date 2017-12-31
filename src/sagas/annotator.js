import { takeLatest } from 'redux-saga'
import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { getByUser, del } from '../services/annotator'

function* getAnnotator(action) {
    try {
        const { jsonResult } = yield call(getByUser, action)
        if( jsonResult.data ) {
            yield put({
                type: 'annotator/get/success',
                payload: jsonResult.data
            })
        }
    } catch(e) {
        yield put({
            type: 'annotator/get/failed',
            message: e
        })
    }
}

function* delAnnotator(action) {
    try {
        const { jsonResult } = yield call(del, action)

        if(jsonResult) {
            yield put({
                type: 'annotator/get',
                data: {
                    user_id: params.uid,
                    book_id: params.bid
                }
            })
        }
    } catch(e) {
        yield put({
            type: 'annotator/del/failed',
            message: e
        })
    }
}

function* watchAnnotatorGet() {
    yield takeLatest('annotator/get', getAnnotator)
}

function* watchAnnotatorDel() {
    yield takeLatest('annotator/del', delAnnotator)
}

export default function* () {
    yield fork(watchAnnotatorGet)
    yield fork(watchAnnotatorDel)
}
