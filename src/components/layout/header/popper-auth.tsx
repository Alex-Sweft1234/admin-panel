import React, { useState } from 'react'
import { Box, Grid, Popover, Fade, Theme } from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../api'
import { useReduxSelector, useReduxDispatch } from '../../../hooks'

export const PopoverAuth: React.FC = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useReduxDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { data: adminData } = useReduxSelector((state) => state.auth)

  const handleClickLk = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClickExit = () => {
    handleClose()
    logout()
  }

  return (
    <>
      <Box onClick={handleClickLk} className={classes.link}>
        <Grid container wrap="nowrap" alignItems="center" spacing={1}>
          <Grid item>
            <PermIdentityIcon />
          </Grid>
          <Grid item>{adminData?.login}</Grid>
        </Grid>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <>
          <Fade in={open} timeout={250}>
            <Box py={2} className={classes.popoverBody}>
              <Box className={classes.popoverInfo}>
                <Grid container>
                  <Grid item xs={4} className={classes.label}>
                    Роль:
                  </Grid>
                  <Grid item xs={8}>
                    <span className={classes.text}>{adminData?.role}</span>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Box onClick={handleClickExit} className={classes.linkLogout}>
                      Выйти
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Fade>
        </>
      </Popover>
    </>
  )
}

const useStyles = makeStyles(({ palette, breakpoints: { down } }: Theme) => ({
  popoverBody: {
    fontSize: 18,
    paddingBottom: 10,
  },
  popover: {
    '& .MuiPopover-paper': {
      width: 250,
      marginTop: 10,
    },
  },
  popoverInfo: {
    padding: '0px 20px',
    textAlign: 'left',
  },
  label: {
    fontWeight: 500,
  },
  text: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  },
  link: {
    fontSize: 18,
    fontWeight: 400,
    color: palette.primary.contrastText,
    textDecoration: 'none!important',
    '&:hover': {
      textDecoration: 'none!important',
    },
  },
  linkLogout: {
    textDecoration: 'none',
    fontSize: 18,
    fontWeight: 400,
    color: palette.primary.dark,
    marginTop: 10,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none!important',
      color: palette.primary.main,
    },
  },
}))
