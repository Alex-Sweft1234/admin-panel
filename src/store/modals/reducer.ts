import { MODAL, SET_MODAL, SET_ALERT, ALERT, AlertAction, ModalAction } from './types'

const initialState: ModalAction & AlertAction = {
  modal: {},
  alert: {},
}

export const ModalReducer = (state = initialState, action: MODAL | ALERT) => {
  const { type, payload } = action

  switch (type) {
    case SET_MODAL:
      return { ...state, ...payload }

    case SET_ALERT:
      return { ...state, ...payload }

    default:
      return state
  }
}
