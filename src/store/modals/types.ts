import { AlertProps } from '../../types/default'

export const SET_MODAL = 'SET_MODAL'
export const SET_ALERT = 'SET_ALERT'

export interface ModalAction {
  modal: { [name: string]: { show: boolean; params?: any } }
}

export interface AlertAction {
  alert: AlertProps
}

export type MODAL = { type: typeof SET_MODAL; payload: ModalAction }
export type ALERT = { type: typeof SET_ALERT; payload: AlertAction }
