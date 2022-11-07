import { createStore, combineReducers, applyMiddleware, Middleware, compose, Store } from 'redux'
import thunk from 'redux-thunk'

import { AuthReducer as auth } from './auth'
import { ModalReducer as modals } from './modals'

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const loggerMiddleware: Middleware = (api) => (next) => (action) => {
  // console.log('Middleware', store.getState())
  return next(action)
}

const reducers = combineReducers({ auth, modals })

const store: Store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, loggerMiddleware)))

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch
export default store
