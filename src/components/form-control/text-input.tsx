import React from 'react'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'
import { autocomleteInputOffProps } from './props-autocomplete'
import { GenericTextInput } from './generic-text-input'

type Props = {
  form: UseFormReturn<any>
  name: string
  label?: string
  variant?: 'standard' | 'filled' | 'outlined'
  placeholder?: string
  disabled?: boolean
  required?: boolean
  focused?: boolean
  options?: RegisterOptions
  inputProps?: any
  multiline?: boolean
  rows?: number
}

export const TextInput: React.FC<Props> = ({
  form,
  name,
  variant = 'outlined',
  placeholder,
  label = 'Логин',
  disabled = false,
  required = true,
  focused,
  options,
  inputProps,
  multiline = false,
  rows = 1,
}): JSX.Element => {
  const { register, formState } = form

  return (
    <GenericTextInput
      register={register(name, { required, ...options })}
      InputProps={{ ...(autocomleteInputOffProps as any), ...inputProps }}
      helperText={formState.errors[name]?.message}
      placeholder={placeholder}
      multiline={multiline}
      disabled={disabled}
      variant={variant}
      focused={focused}
      label={label}
      rows={rows}
    />
  )
}
