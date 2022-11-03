import { createStore, combineReducers, applyMiddleware, Middleware, compose } from 'redux'
import thunk from 'redux-thunk'

const composeEnhancers = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const loggerMiddleware: Middleware = (api) => (next) => (action) => {
  // console.log('Middleware', store.getState())
  return next(action)
}

const reducers = combineReducers({})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, loggerMiddleware)))

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch
export default store
