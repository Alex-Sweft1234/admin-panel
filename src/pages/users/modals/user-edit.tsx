import React, { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { EmailInput, Modal, TextInput, validation } from '../../../components'
import { User } from '../../../types/default'
import { getUsersUpdate } from '../../../api'

interface IUserEditModal {
  user: User
  show: any
  updateUser(): void
  onClose: () => void
}
type BtnProps = {
  first_name: boolean
  email: boolean
  phone: boolean
}

const schema = validation({
  first_name: yup.string().required().min(2).max(20),
  email: yup
    .string()
    .required()
    .matches(/^\s*([\w.%+-]+)@([\w-]+\.)+([\w]{2,})\s*$/i, { message: 'Указан некорректный e-mail' }),
})

export const UserEditModal: React.FC<IUserEditModal> = ({
  user,
  updateUser,
  show = false,
  onClose = () => {},
}): JSX.Element => {
  const classes = useStyles()
  const defaultBtn = {
    first_name: false,
    email: false,
    phone: false,
  }

  const [btn, setBtn] = useState<BtnProps>(defaultBtn)
  const [userData, setUserData] = useState<User>({ _id: '', first_name: '', email: '', phone: '' })

  const hookFormFirstName = useForm<{ first_name: string }>({
    defaultValues: { first_name: '' },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const hookFormEmail = useForm<{ email: string }>({
    defaultValues: { email: '' },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const hookFormPhone = useForm<{ phone: string }>({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onCloseModal = () => {
    onClose()
    setBtn(defaultBtn)
  }

  const editBtn = (edit: any) => {
    setBtn({ ...btn, ...edit })
  }

  const editConfirm = (data: any) => {
    console.log(data)
    getUsersUpdate(user._id, data).then((res) => {
      updateUser()
      setUserData(res.data)
      setBtn(defaultBtn)
    })
  }

  const editRejectBtn = (edit: any) => {
    setBtn({ ...btn, ...edit })
  }

  useEffect(() => {
    setUserData(user)
  }, [user])

  return (
    <Modal title="Редактирование" open={show} onClose={onCloseModal} className={classes.modal}>
      <Box className={classes.titleItem} mb="6px">
        id: <span id="val">{user._id}</span>
      </Box>
      <form onSubmit={hookFormFirstName.handleSubmit(editConfirm)} autoComplete="off" noValidate>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box className={classes.titleItem}>
              {btn.first_name ? (
                <Box height={60} mt={1}>
                  <TextInput variant="filled" label="Имя" form={hookFormFirstName} name="first_name" />
                </Box>
              ) : (
                <>
                  Имя: <span id="val">{userData.first_name}</span>
                </>
              )}
            </Box>
          </Grid>
          <Grid item>
            {btn.first_name ? (
              <>
                <IconButton key="confirm-name" type="submit">
                  <CheckIcon style={{ fontSize: 24 }} />
                </IconButton>
                <IconButton key="reject-name" onClick={() => editRejectBtn({ first_name: false })}>
                  <CloseIcon style={{ fontSize: 24 }} />
                </IconButton>
              </>
            ) : (
              <IconButton key="edit-name" onClick={() => editBtn({ first_name: true })}>
                <EditIcon style={{ fontSize: 22 }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </form>
      <form onSubmit={hookFormEmail.handleSubmit(editConfirm)} autoComplete="off" noValidate>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box className={classes.titleItem}>
              {btn.email ? (
                <Box height={60} mt={1}>
                  <EmailInput variant="filled" form={hookFormEmail} name="email" />
                </Box>
              ) : (
                <>
                  Email: <span id="val">{userData.email}</span>
                </>
              )}
            </Box>
          </Grid>
          <Grid item>
            {btn.email ? (
              <>
                <IconButton key="confirm-email" type="submit">
                  <CheckIcon style={{ fontSize: 24 }} />
                </IconButton>
                <IconButton key="reject-email" onClick={() => editRejectBtn({ email: false })}>
                  <CloseIcon style={{ fontSize: 24 }} />
                </IconButton>
              </>
            ) : (
              <IconButton key="edit-email" onClick={() => editBtn({ email: true })}>
                <EditIcon style={{ fontSize: 22 }} />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </form>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.titleItem}>
            Телефон: <span id="val">{userData.phone}</span>
          </Box>
        </Grid>
        <Grid item>
          <IconButton>
            <EditIcon style={{ fontSize: 22 }} />
          </IconButton>
        </Grid>
      </Grid>
    </Modal>
  )
}

const useStyles = makeStyles(({ breakpoints: { down }, palette }: Theme) => ({
  modal: {
    '&.MuiFilledInput-root': {
      height: '35px!important',
    },
  },
  titleItem: {
    fontSize: 20,
    fontWeight: 500,
    '& #val': {
      fontWeight: 400,
    },
  },
}))
