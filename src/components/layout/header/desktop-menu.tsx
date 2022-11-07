import React from 'react'
import { AppBar, Container, Grid, Link, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { MyLink } from '../../my-link'

type MenuItem = {
  key: string
  title: string
  target: '_self' | '_blank'
}

const menu: MenuItem[] = [
  {
    key: 'main',
    title: 'Главная',
    target: '_self',
  },
  {
    key: 'users',
    title: 'Пользователи',
    target: '_self',
  },
]

export const DesktopMenu: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <AppBar position="relative">
      <Container maxWidth="lg" style={{ height: '100%' }}>
        <Grid container justifyContent="space-between" alignItems="center" height="100%">
          <Grid item xs={3}>
            <Grid container justifyContent="space-between" alignItems="center" height="100%">
              {menu.map((item, index) => {
                return (
                  <Grid key={index} item>
                    <Link component={MyLink} to={item.key === 'main' ? '/' : `/${item.key}`} className={classes.link}>
                      {item.title}
                    </Link>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </Container>
    </AppBar>
  )
}

const useStyles = makeStyles(({ breakpoints: { down }, palette }: Theme) => ({
  link: {
    display: 'block',
    cursor: 'pointer',
    textDecoration: 'none!important',
    fontSize: 17,
    fontWeight: 400,
    color: `${palette.text.secondary}!important`,
    position: 'relative',
    '&:hover': {
      color: palette.text.primary,
      textDecoration: 'none',
    },
  },
}))
