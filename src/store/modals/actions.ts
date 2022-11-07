import { ModalAction, ALERT, SET_ALERT, SET_MODAL, MODAL } from './types'
import { AlertProps } from '../../types/default'

export const modalsAction = {
  modal: (payload: ModalAction): MODAL => ({ type: SET_MODAL, payload }),
  alert: (payload: AlertProps): ALERT => ({ type: SET_ALERT, payload: { alert: payload } }),
}
