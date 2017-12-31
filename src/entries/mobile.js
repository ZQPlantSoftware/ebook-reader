require('babel-polyfill')
import React from 'react'
import { render } from 'react-dom'
import MApp from '../components/MApp'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers/mobile/index'
import sagas from '../sagas/mobile/index'

//////////////////
// saga

const sagaMiddleware = createSagaMiddleware()

//////////////////
// store

const initialState = {}
const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
const store = createStore(combineReducers({
    ...reducers
}), initialState, enhancer)

sagaMiddleware.run(sagas)

//////////////////
// render

render(
    (<Provider store={store}>
        <MApp />
    </Provider>),
    document.getElementById('main')
)
