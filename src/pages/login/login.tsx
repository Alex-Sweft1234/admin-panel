import React from 'react'
import { Box, Grid, Container } from '@mui/material'
import { LoginForm } from './login-form'

export const LoginPage: React.FC = (): JSX.Element => {
  return (
    <Container maxWidth="sm" style={{ height: '100vh' }}>
      <Grid container direction="row" justifyContent="center" alignItems="center" height="100vh">
        <Grid item xs={12} sm={9}>
          <Box textAlign="center" fontSize={28} fontWeight={500} mb={3}>
            Авторизация
          </Box>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  )
}
