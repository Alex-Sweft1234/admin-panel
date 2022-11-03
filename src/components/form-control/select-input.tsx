import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, Select, MenuItem } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

type Props = {
  form: UseFormReturn<any>
  names: string
  items: any[]
  label?: string
  placeholder?: string
  variant?: 'standard' | 'filled' | 'outlined'
  color?: 'primary' | 'secondary'
  disabled?: boolean
  required?: boolean
  focused?: boolean
  onClickItem?: (id: number, title: string) => void
}

export const SelectInput: React.FC<Props> = ({
  form,
  names,
  items = [],
  variant = 'outlined',
  color = 'primary',
  label = 'Тема',
  placeholder,
  disabled = false,
  focused,
  onClickItem = () => {},
}): JSX.Element => {
  const { register, formState } = form
  const { onBlur, ref } = register(names)

  const [themeValue, setThemeValue] = useState<string>('')
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false)

  const handleChange = (event: SelectChangeEvent<typeof themeValue>) => {
    const {
      target: { value },
    } = event
    setThemeValue(value)
    onBlur(event).then(() => {})
  }

  const handleBlur = (event: any) => {
    onBlur(event).then(() => setShowPlaceholder(event.target.value === undefined))
  }

  const handleFocus = () => {
    setShowPlaceholder(true)
  }

  const handleClose = () => {
    setTimeout(() => (document.activeElement as HTMLElement).blur(), 0)
  }

  return (
    <FormControl fullWidth focused={focused} disabled={disabled} variant={variant} color={color}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...register(names)}
        ref={ref}
        name={names}
        displayEmpty
        value={themeValue}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onClose={handleClose}
        onChange={handleChange}
        renderValue={(selected: any) => {
          if (selected.length === 0 && placeholder && showPlaceholder) {
            return <span style={{ opacity: 0.5, fontSize: 17 }}>{placeholder}</span>
          }
          return selected
        }}
      >
        {items.map((item: any) => {
          const { id, title = '', name = '', text = '' } = item
          return (
            <MenuItem
              id={id}
              value={title || name || text}
              onClick={() => onClickItem(id, title || name || text)}
              disableRipple
            >
              {title || name || text}
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{formState.errors[names]?.message as string}</FormHelperText>
    </FormControl>
  )
}
