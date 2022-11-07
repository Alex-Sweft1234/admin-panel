import { AUTH, FETCH_AUTH_FAILURE, FETCH_AUTH_SUCCESS, FETCH_AUTH_REQUEST, AuthProps } from './types'

const initialState = {
  data: undefined,
  loading: true,
  error: undefined,
  auth: false,
}

export const AuthReducer = (state: AuthProps = initialState, action: AUTH): AuthProps => {
  const { data } = state
  const { type, payload } = action

  switch (type) {
    case FETCH_AUTH_REQUEST:
      return { ...state, loading: true, auth: false }
    case FETCH_AUTH_SUCCESS:
      return { data: payload?.data, loading: false, error: undefined, auth: true }
    case FETCH_AUTH_FAILURE:
      return { data, loading: false, error: payload, auth: false }
    default:
      return state
  }
}
