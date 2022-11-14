import React from 'react'
import { Box, Fade, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { MenuRoot } from './header/header'
import { Footer } from './footer/footer'
import { useReduxSelector } from '../../hooks'

export const Layout: React.FC<{ children: any }> = ({ children }): JSX.Element => {
  const classes = useStyles()

  const { auth } = useReduxSelector((state) => state.auth)

  return (
    <Fade in timeout={{ enter: 500 }}>
      <Box className={classes.body}>
        {auth && (
          <Box className={classes.header}>
            <MenuRoot />
          </Box>
        )}
        <Box className={clsx(classes.main, { [classes.mainAuth]: auth })}>{children}</Box>
        {auth && (
          <Box className={classes.footer}>
            <Footer />
          </Box>
        )}
      </Box>
    </Fade>
  )
}

const useStyles = makeStyles(({ breakpoints: { down }, palette }: Theme) => ({
  body: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {},
  main: {
    flex: 'auto',
  },
  mainAuth: {
    paddingTop: 70,
    paddingBottom: 50,
  },
  footer: {
    flexShrink: 0,
  },
}))
