import React, { useCallback, useEffect, useState, SyntheticEvent } from 'react'
import {
  Box,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { getChartUsers, getUsers } from '../../api'
import { User } from '../../types/default'
import { UserEditModal } from './modals'
import { PaginationCustom } from '../../components/pagination'
import { UsersChart } from './chart'
import { phoneFormat } from '../../utils'

type ModalEditProps = {
  user: User
  show: boolean
}

type UserListProps = {
  items: User[]
  page: number
  per_page: number
  total: number
  last_page: number
}

type UserChartProps = {
  labels: string[]
  datasets: number[]
  month: {
    num: number
    name: string
  }
}

export const UsersPage: React.FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [month, setMonth] = useState<number>(0)
  const [chart, setChart] = useState<UserChartProps>({
    labels: [],
    datasets: [],
    month: {
      num: 0,
      name: '',
    },
  })
  const [users, setUsers] = useState<UserListProps>({
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

  const usersChart = useCallback(
    (m?: number | undefined) => {
      getChartUsers(m).then((res) => {
        setChart(res.data)
        setMonth(res.data.month.num)
      })
    },
    [month]
  )

  const usersList = useCallback((p: number, per: number) => {
    getUsers(p, per).then((res) => setUsers(res.data))
  }, [])

  const changePage = (event: SyntheticEvent, value: number) => {
    usersList(value, perPage)
  }

  const prevChart = () => {
    usersChart(month - 1)
  }

  const nextChart = () => {
    usersChart(month + 1)
  }

  useEffect(() => {
    usersChart(month > 0 ? month : undefined)
    usersList(page, perPage)
  }, [])

  return (
    <>
      <UserEditModal
        user={modalEdit.user}
        show={modalEdit.show}
        updateUser={() => usersList(page, perPage)}
        onClose={() => setModalEdit({ ...modalEdit, show: false })}
      />

      <Container maxWidth="lg">
        <Box mb={6} width={1000}>
          <Typography variant="h2">График регистрации пользователей</Typography>
          <UsersChart dataChart={chart} />
          <Grid container direction="row" justifyContent="center" mt={1}>
            <Grid item>
              <Grid container direction="row" wrap="nowrap" alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton onClick={prevChart}>
                    <ArrowBackIosIcon style={{ fontSize: 18 }} />
                  </IconButton>
                </Grid>
                <Grid item>{chart.month.name}</Grid>
                <Grid item>
                  <IconButton onClick={nextChart}>
                    <ArrowForwardIosIcon style={{ fontSize: 18 }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
                  <TableCell>{phoneFormat(user.phone)}</TableCell>
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
