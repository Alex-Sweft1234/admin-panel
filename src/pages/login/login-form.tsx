import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FormProps } from '../../types/default'
import { TextInput, PasswordInput, validation, Snackbar, SubmitButton } from '../../components'
import { useReduxDispatch } from '../../hooks'
import { signin } from '../../api'
import { AuthAction } from '../../store/auth'

type SignInProps = { login: string; password: string }

const schema = validation({
  login: yup.string().required(),
  password: yup.string().required().length(6),
})

export const LoginForm: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useReduxDispatch()

  const hookForm = useForm<any>({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [formProps, setFormProps] = useState<FormProps<SignInProps>>({
    data: { login: '', password: '' },
    processed: false,

    snackbar: {
      onClose: () => setFormProps({ ...formProps, snackbar: { ...formProps.snackbar, message: undefined } }),
    },
  })

  const onSubmitForm = async ({ login, password }: SignInProps) => {
    setFormProps({ ...formProps, snackbar: { ...formProps.snackbar, message: undefined }, processed: true })

    return await signin(login, password.replace(/\s/g, ''))
      .then((res) => {
        dispatch(AuthAction({ onSuccess: () => navigate('../') }))
      })
      .catch((err) => {
        console.log(err)
        setFormProps({
          ...formProps,
          processed: false,
          snackbar: { ...formProps.snackbar, message: { error: err.message } },
        })
      })
  }

  useEffect(() => {
    hookForm.setFocus('login')
  }, [])

  return (
    <form onSubmit={hookForm.handleSubmit(onSubmitForm)} autoComplete="off" noValidate>
      <Grid container direction="row" justifyContent="center">
        <Grid item xs={12}>
          <Box width="100%" height={70}>
            <TextInput
              variant="filled"
              name="login"
              placeholder="Введите логин"
              form={hookForm}
              disabled={formProps.processed}
            />
          </Box>
          <Box width="100%" height={70}>
            <PasswordInput
              variant="filled"
              name="password"
              placeholder="Введите пароль"
              form={hookForm}
              disabled={formProps.processed}
            />
          </Box>
          <Snackbar {...formProps.snackbar} variantMessage="error" />
          <Box width="100%" mt={3}>
            <SubmitButton fullWidth disabled={formProps.processed} processed={formProps.processed} title="Войти" />
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}
