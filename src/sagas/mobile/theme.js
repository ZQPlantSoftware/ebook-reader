import { takeLatest } from 'redux-saga'
import { take, put, call, fork } from 'redux-saga/effects'
import { change } from '../../services/theme'

function* changeTheme (action) {
    try {
        // const { jsonResult } = yield call(change, action)
        yield put({
            type: 'theme/change/success',
            payload: action.data
        })
    } catch(e) {
        console.log("changeTheme error:", e)
    }
}

function* watchChangeTheme () {
    yield takeLatest('theme/change', changeTheme)
}

export default function* () {
    yield fork(watchChangeTheme)

    let themeStr = localStorage.getItem('theme')
    if (themeStr && themeStr.length > 0) {
        let theme = JSON.parse(themeStr)
        yield put ({
            type: 'theme/change',
            data: theme
        })
    }
}
