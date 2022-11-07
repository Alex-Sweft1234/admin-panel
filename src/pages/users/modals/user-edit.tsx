import React from 'react'
import { Modal } from '../../../components'

interface IUserEditModal {
  show: any
  onClose: () => void
}

export const UserEditModal: React.FC<IUserEditModal> = ({ show = false, onClose = () => {} }): JSX.Element => {
  return (
    <Modal title="Редактирование" open={show} onClose={onClose}>
      текс модалки
    </Modal>
  )
}
