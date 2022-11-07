import React from 'react'
import { Box, Fade, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { MenuRoot } from './header/header'
import { Footer } from './footer/footer'

export const Layout: React.FC<{ children: any }> = ({ children }): JSX.Element => {
  const classes = useStyles()

  return (
    <Fade in timeout={{ enter: 500 }}>
      <Box className={classes.body}>
        <Box className={classes.header}>
          <MenuRoot />
        </Box>
        <Box className={classes.main}>{children}</Box>
        <Box className={classes.footer}>
          <Footer />
        </Box>
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
    paddingTop: 70,
    paddingBottom: 50,
  },
  footer: {
    flexShrink: 0,
  },
}))
