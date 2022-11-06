import { Admin, Message } from '../../types/default'

export interface AuthProps {
  data?: Admin
  loading: boolean
  auth: boolean
  error?: Message[]
}

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST'
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS'
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE'

interface Request {
  type: typeof FETCH_AUTH_REQUEST
  payload: any
}

interface Success {
  type: typeof FETCH_AUTH_SUCCESS
  payload: any
}

interface Failure {
  type: typeof FETCH_AUTH_FAILURE
  payload: any
}

export type AUTH = Request | Success | Failure
