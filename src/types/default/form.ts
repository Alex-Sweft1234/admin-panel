export interface FormProps<T> {
  data: T
  processed: boolean
  snackbar?: SnackbarProps
}

export type SnackbarProps = {
  variantMessage?: any
  message?: any
  onClose?(): void
}

export type messageVariants = 'success' | 'warning' | 'error' | 'info' | 'reset'
export type Message = string[]

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'