import React from 'react'
import { RegisterOptions, UseFormReturn } from 'react-hook-form'
import { numericInputProps } from './props-autocomplete'
import { GenericTextInput } from './generic-text-input'
import { InputType } from '../../types/default'

type Props = {
  form: UseFormReturn<any>
  name: string
  label?: string
  variant?: 'standard' | 'filled' | 'outlined'
  placeholder?: string
  disabled?: boolean
  options?: RegisterOptions
  inputProps?: any
  type?: InputType
}

export const NumberInput: React.FC<Props> = ({
  form,
  name,
  variant = 'outlined',
  placeholder = undefined,
  label = 'Код',
  disabled = false,
  options,
  inputProps,
  type = 'text',
}): JSX.Element => {
  const { register, formState } = form

  return (
    <GenericTextInput
      register={register(name, { required: true, disabled, ...options })}
      InputProps={{ inputProps: { ...(numericInputProps as any), ...inputProps } }}
      placeholder={placeholder}
      disabled={disabled}
      variant={variant}
      label={label}
      type={type}
      helperText={formState.errors[name]?.message}
    />
  )
}
