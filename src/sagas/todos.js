import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { getAll } from '../services/todos';

function* getTodos() {
  try {
    const { jsonResult } = yield call(getAll);
    if (jsonResult.data) {
      yield put({
        type: 'todos/get/success',
        payload: jsonResult.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchTodosGet() {
    yield takeLatest('todos/get', getTodos)
}

export default function* () {
    yield fork(watchTodosGet);

    // Load todos.
    // yield put({
    //     type: 'todos/get',
    // });
}
