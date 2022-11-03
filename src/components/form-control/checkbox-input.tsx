import React, { ChangeEvent, ReactElement } from 'react'
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'

type Props = {
  form: UseFormReturn<any>
  name: string
  label: string | ReactElement
  color?: 'primary' | 'secondary'
  icon: ReactElement
  checked: ReactElement
  disabled?: boolean
  required?: boolean
  onChange?(e: ChangeEvent<HTMLInputElement>, checked: boolean): void
}

export const CheckboxInput: React.FC<Props> = ({
  form,
  name,
  label,
  icon,
  checked,
  color = 'primary',
  required = false,
  disabled = false,
  onChange: change,
}): JSX.Element => {
  const { control, formState } = form

  return (
    <Box mb={3 / 2}>
      <FormControl>
        <FormControlLabel
          control={
            <Controller
              control={control}
              name={name}
              rules={{ required }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Checkbox
                  color={color}
                  onBlur={onBlur}
                  onChange={(e, c) => {
                    onChange(e, c)
                    if (change) change(e, c)
                  }}
                  checked={value}
                  inputRef={ref}
                  disabled={disabled}
                  checkedIcon={checked}
                  icon={icon}
                />
              )}
            />
          }
          label={label}
        />
        <FormHelperText>{formState.errors[name]?.message as string}</FormHelperText>
      </FormControl>
    </Box>
  )
}
