import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { TextField, TextFieldProps } from '@mui/material'

type Props = {
  form: UseFormReturn<any>
  name: string
  variant?: 'standard' | 'filled' | 'outlined'
  disabled?: boolean
  label: string
}

export const TimeInput: React.FC<Props> = ({
  form,
  name,
  variant = 'outlined',
  disabled = false,
  label,
}): JSX.Element => {
  const { control } = form

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ...rest }, formState }) => (
        <DesktopTimePicker
          label={label}
          mask="__:__"
          inputFormat="HH:mm"
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
