import React, { ChangeEvent } from 'react'
import {
  SelectProps as SelectPropsType,
  TextField,
  InputLabelProps as InputLabelPropsType,
  OutlinedInputProps,
  FilledInputProps,
  InputBaseComponentProps,
} from '@mui/material'
import { InputType } from '../../types/default'

type Props = {
  id?: string
  register: any
  helperText: any
  label?: string
  placeholder?: string
  autoComplete?: string
  type?: InputType
  variant?: 'standard' | 'filled' | 'outlined'
  color?: 'primary' | 'secondary'
  fullWidth?: boolean
  InputProps?: OutlinedInputProps | FilledInputProps
  SelectProps?: SelectPropsType
  InputLabelProps?: InputLabelPropsType
  disabled?: boolean
  select?: boolean
  multiline?: boolean
  rows?: number
  focused?: boolean
  children?: any
  inputProps?: InputBaseComponentProps
  onChange?(e: ChangeEvent<any>): void
}

export const GenericTextInput: React.FC<Props> = (props): JSX.Element => {
  const {
    children,
    type = 'text',
    disabled = false,
    InputLabelProps,
    autoComplete = 'off',
    register,
    fullWidth = true,
    variant = 'outlined',
    color = 'primary',
    select = false,
    multiline = false,
    rows = 1,
    focused,
  } = props

  return (
    <TextField
      {...register}
      InputLabelProps={{ ...InputLabelProps }}
      autoComplete={autoComplete}
      fullWidth={fullWidth}
      multiline={multiline}
      disabled={disabled}
      focused={focused}
      variant={variant}
      select={select}
      color={color}
      rows={rows}
      type={type}
      {...props}
    >
      {children}
    </TextField>
  )
}
