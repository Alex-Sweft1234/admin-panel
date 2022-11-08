import React from 'react'
import { Box, Container, Grid, Link, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { MyLink } from '../../my-link'

export const Footer: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="space-between" alignItems="center" height={60}>
          <Grid item>
            <Link component={MyLink} to="/" className={classes.link}>
              Админ панель
            </Link>
          </Grid>
          <Grid item>Atoms, 2022</Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const useStyles = makeStyles(({ breakpoints: { down }, palette }: Theme) => ({
  footer: {
    width: '100%',
    height: 60,
    fontSize: 17,
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
  },
  link: {
    display: 'block',
    cursor: 'pointer',
    textDecoration: 'none!important',
    fontSize: 18,
    fontWeight: 400,
    color: `${palette.text.secondary}!important`,
    position: 'relative',
    '&:hover': {
      color: palette.text.primary,
      textDecoration: 'none',
    },
  },
}))
