import React, { useCallback, useEffect, useState } from 'react'
import { Box, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { getUsers } from '../../api'
import { User } from '../../types/default'
import { UserEditModal } from './modals'

export const UsersPage: React.FC = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([])
  const [modalEdit, setModalEdit] = useState<User | null>(null)

  const usersList = useCallback(() => {
    getUsers().then((res) => setUsers(res.data))
  }, [])

  useEffect(() => {
    usersList()
  }, [])

  return (
    <>
      <UserEditModal show={modalEdit} onClose={() => setModalEdit(null)} />

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
                      <EditIcon style={{ fontSize: 22 }} onClick={() => setModalEdit(user)} />
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
