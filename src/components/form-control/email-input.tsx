import React from 'react'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'
import { emailInputProps } from './props-autocomplete'
import { GenericTextInput } from './generic-text-input'

type Props = {
  form: UseFormReturn<any>
  name: string
  variant?: 'standard' | 'filled' | 'outlined'
  placeholder?: string
  disabled?: boolean
  options?: RegisterOptions
}

export const EmailInput: React.FC<Props> = ({
  name,
  form,
  variant = 'outlined',
  placeholder,
  disabled = false,
  options,
}): JSX.Element => {
  const { register, formState } = form

  return (
    <GenericTextInput
      register={register(name, { required: true, ...options })}
      InputProps={{ inputProps: { ...(emailInputProps as any) } }}
      placeholder={placeholder}
      disabled={disabled}
      label="E-mail"
      variant={variant}
      type="email"
      helperText={formState.errors[name]?.message}
    />
  )
}
