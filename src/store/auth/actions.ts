import { Dispatch } from 'redux'
import { AuthStoreService } from './service'
import { FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE } from './types'

const requested = () => {
  return {
    type: FETCH_AUTH_REQUEST,
  }
}

const loaded = (newData: any) => {
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: newData,
  }
}

const error = (errorData: any) => {
  return {
    type: FETCH_AUTH_FAILURE,
    payload: errorData,
  }
}

export const AuthAction: any =
  ({ onSuccess = (data?: any) => {}, onError = () => {} }) =>
  (dispatch: Dispatch) => {
    dispatch(requested())

    AuthStoreService()
      .then((data) => {
        dispatch(loaded(data))
        onSuccess(data)
      })
      .catch(({ status, data }) => {
        if (status === 402) {
          dispatch(loaded(data.data))
          onSuccess(data.data)
        } else {
          dispatch(error(data))
          onError()
        }
      })
  }
