import React, { useCallback, useEffect, useState, SyntheticEvent } from 'react'
import { Box, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { getChartUsers, getUsers } from '../../api'
import { User } from '../../types/default'
import { UserEditModal } from './modals'
import { PaginationCustom } from '../../components/pagination'
import { UsersChart } from './chart'

type ModalEditProps = {
  user: User
  show: boolean
}

type UserList = {
  items: User[]
  page: number
  per_page: number
  total: number
  last_page: number
}

type UserChart = {
  labels: string[]
  datasets: number[]
}

export const UsersPage: React.FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(6)
  const [chart, setChart] = useState<UserChart>({
    labels: [],
    datasets: [],
  })
  const [users, setUsers] = useState<UserList>({
    items: [],
    page,
    per_page: perPage,
    total: 0,
    last_page: 0,
  })
  const [modalEdit, setModalEdit] = useState<ModalEditProps>({
    user: {
      _id: '',
      first_name: '',
      email: '',
      phone: '',
    },
    show: false,
  })

  const usersChart = useCallback(() => {
    getChartUsers().then((res) => setChart(res.data))
  }, [])

  const usersList = useCallback((p: number, per: number) => {
    getUsers(p, per).then((res) => setUsers(res.data))
  }, [])

  const changePage = (event: SyntheticEvent, value: number) => {
    usersList(value, perPage)
  }

  useEffect(() => {
    usersChart()
    usersList(page, perPage)
  }, [])

  return (
    <>
      <UserEditModal
        user={modalEdit.user}
        show={modalEdit.show}
        onClose={() => setModalEdit({ ...modalEdit, show: false })}
      />

      <Container maxWidth="lg">
        <Box mb={6} width={900}>
          <Typography variant="h2">График регистрации пользователей</Typography>
          <UsersChart dataChart={chart} />
        </Box>
        <Typography variant="h2">Список пользователей</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>имя</TableCell>
              <TableCell>email</TableCell>
              <TableCell>телефон</TableCell>
              <TableCell>изменить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.items.map((user, index) => {
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
        {users.total > users.per_page && (
          <Box py={4} width="100%" display="flex" justifyContent="center">
            <PaginationCustom count={users.last_page} page={users.page} onChange={changePage} />
          </Box>
        )}
      </Container>
    </>
  )
}
