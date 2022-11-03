import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { TextField, TextFieldProps } from '@mui/material'

type Props = {
  form: UseFormReturn<any>
  name: string
  minDate: number
  maxDate: number
  variant?: 'standard' | 'filled' | 'outlined'
  disabled?: boolean
  placeholder?: string
  label?: string
  required?: boolean
}

export const DateInput: React.FC<Props> = ({
  form,
  name,
  minDate,
  maxDate,
  variant = 'outlined',
  disabled = false,
  label = 'Дата регистрации',
}): JSX.Element => {
  const { control } = form

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ...rest }, formState }) => (
        <DesktopDatePicker
          label={label}
          mask="__.__.____"
          inputFormat="dd.MM.yyyy"
          minDate={minDate}
          maxDate={maxDate}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
          renderInput={(params: TextFieldProps) => (
            <TextField
              fullWidth
              variant={variant}
              color="primary"
              onBlur={onBlur}
              helperText={formState.errors[name]?.message as string}
              {...params}
            />
          )}
        />
      )}
    />
  )
}
