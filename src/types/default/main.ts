import { Message } from './service'

export type AlertProps = {
  message?: Message
  rootModal?: string
  onClose?(): void
  onAction?(): void
  closeButton?: boolean
  title?: string
  fullScreen?: boolean
  actionButtonText?: string
}
