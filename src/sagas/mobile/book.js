import { takeLatest } from 'redux-saga'
import { take, call, put, fork, cancel } from 'redux-saga/effects'
import { init } from '../../services/mobile/book'

function* initBook (action) {
    // try {
        const { jsonResult } = yield call(init, action)

        if( jsonResult.data ) {
            yield put({
                type: 'book/init/success',
                payload: jsonResult.data
            })

            yield put({type: 'book/show'})
        } else {
            yield put({
                type: 'book/init/failed',
                message: '参数不正确'
            })
        }
    // } catch (e) {
    //     yield put({
    //         type: 'book/init/failed',
    //         message: e
    //     })
    // }
}

function* watchInit () {
    yield takeLatest('book/init', initBook)
}

export default function* () {
    yield fork(watchInit)

    if( params.r ) {
        yield put({
            type: 'book/init',
            data: {
                r: params.r
            }
        })
    }
}
