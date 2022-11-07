import React from 'react'
import { Box, Grid, IconButton, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import EditIcon from '@mui/icons-material/Edit'
import { Modal } from '../../../components'
import { User } from '../../../types/default'

interface IUserEditModal {
  user: User
  show: any
  onClose: () => void
}

export const UserEditModal: React.FC<IUserEditModal> = ({ user, show = false, onClose = () => {} }): JSX.Element => {
  const classes = useStyles()
  return (
    <Modal title="Редактирование" open={show} onClose={onClose}>
      <Box className={classes.titleItem} mb="6px">
        id: <span id="val">{user._id}</span>
      </Box>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.titleItem}>
            Имя: <span id="val">{user.first_name}</span>
          </Box>
        </Grid>
        <Grid item>
          <IconButton>
            <EditIcon style={{ fontSize: 22 }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.titleItem}>
            Email: <span id="val">{user.email}</span>
          </Box>
        </Grid>
        <Grid item>
          <IconButton>
            <EditIcon style={{ fontSize: 22 }} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box className={classes.titleItem}>
            Телефон: <span id="val">{user.phone}</span>
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
  titleItem: {
    fontSize: 20,
    fontWeight: 500,
    '& #val': {
      fontWeight: 400,
    },
  },
}))
