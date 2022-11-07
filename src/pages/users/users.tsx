import React, { useCallback, useEffect, useState } from 'react'
import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { getUsers } from '../../api'
import { User } from '../../types/default'
import { UserEditModal } from './modals'

type ModalEditProps = {
  user: User
  show: boolean
}

export const UsersPage: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([])
  const [modalEdit, setModalEdit] = useState<ModalEditProps>({
    user: {
      _id: '',
      first_name: '',
      email: '',
      phone: '',
    },
    show: false,
  })

  const usersList = useCallback(() => {
    getUsers().then((res) => setUsers(res.data))
  }, [])

  useEffect(() => {
    usersList()
  }, [])

  return (
    <>
      <UserEditModal
        user={modalEdit.user}
        show={modalEdit.show}
        onClose={() => setModalEdit({ ...modalEdit, show: false })}
      />

      <Container maxWidth="lg">
        <Typography variant="h2">Пользователи</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>email</TableCell>
              <TableCell>телефон</TableCell>
              <TableCell>Изменить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <IconButton>
                      <EditIcon style={{ fontSize: 22 }} onClick={() => setModalEdit({ user, show: true })} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Container>
    </>
  )
}
