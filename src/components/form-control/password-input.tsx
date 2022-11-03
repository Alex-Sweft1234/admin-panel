import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material'
import { passwordInputProps } from './props-autocomplete'
import { GenericTextInput } from './generic-text-input'

type Props = {
  form: UseFormReturn
  name: string
  variant?: 'standard' | 'filled' | 'outlined'
  disabled?: boolean
  placeholder?: string
}

export const PasswordInput: React.FC<Props> = ({
  form,
  name,
  variant = 'outlined',
  disabled = false,
  placeholder,
}): JSX.Element => {
  const { register, formState } = form
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  return (
    <GenericTextInput
      register={register(name, { required: true, maxLength: 6, minLength: 6, pattern: /^\d{6}$/i })}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="primary"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              aria-label="toggle password visibility"
            >
              {showPassword ? (
                <VisibilityOutlined style={{ fontSize: '90%' }} />
              ) : (
                <VisibilityOffOutlined style={{ fontSize: '90%' }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
        inputProps: { ...(passwordInputProps as any), inputMode: 'numeric' },
      }}
      label="Пароль"
      variant={variant}
      disabled={disabled}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      helperText={formState.errors[name]?.message}
    />
  )
}
