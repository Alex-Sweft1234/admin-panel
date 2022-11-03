import React, { useState, useEffect, ReactNode } from 'react'
import { Grid, Typography } from '@mui/material'
import { Autocomplete } from '@mui/lab'
import { UseFormReturn } from 'react-hook-form'
import { GenericTextInput } from './generic-text-input'
import { withPlanner, WithPlannerProps } from '../hoc'

type Props = {
  form: UseFormReturn<any>
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  processed?: boolean
  optionIcon?: ReactNode
  noOptionsText?: string
  defaultOptions?: Option[]
  fetch?(val: string): Promise<Option[]>
}

export type Option = {
  value: string | number
  title: string
  unrestricted_value: string | undefined
}

export const AutocompleteInput: React.FC<Props & WithPlannerProps> = withPlanner((props): JSX.Element => {
  const {
    form,
    name,
    label,
    disabled = false,
    required = true,
    processed = false,
    noOptionsText = 'Нет доступных вариантов',
    defaultOptions,
    planner,
    optionIcon,
    fetch,
  } = props

  const { register, formState, setValue: setFormValue } = form

  const [value, setValue] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string | undefined>()
  const [options, setOptions] = useState<Option[]>(defaultOptions ?? [])

  const match = async (val: string): Promise<Option[]> => {
    return new Promise((resolve) => {
      if (defaultOptions) resolve(defaultOptions.filter(({ title }) => title.includes(val)))
    })
  }

  const handleFetch = async () => {
    if (inputValue && inputValue?.length > 2) {
      setLoading(true)
      const data = fetch ? await fetch(inputValue) : await match(inputValue)
      setLoading(false)
      setOptions(data)
    } else if (defaultOptions) setOptions(defaultOptions)
  }

  useEffect(() => {
    if (planner?.clearTimeouts())
      planner?.timeout(() => handleFetch(), inputValue && inputValue?.indexOf(' д ') > 5 ? 0 : 500)
  }, [inputValue])

  useEffect(() => {
    if (defaultOptions) setOptions(defaultOptions)
  }, [defaultOptions])

  return (
    <Autocomplete
      freeSolo
      id={`autocomplete-${name}`}
      autoComplete
      value={value}
      loadingText="Загрузка"
      loading={loading}
      options={options}
      noOptionsText={noOptionsText}
      disabled={processed || disabled}
      getOptionLabel={(option: any) => option.title}
      onChange={(_: any, newValue: any) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue?.unrestricted_value || newValue?.value)
        setFormValue(name, newValue?.unrestricted_value || newValue?.value)
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
        setFormValue(name, newInputValue)
      }}
      renderInput={(params) => (
        <GenericTextInput
          // onKeyDown={(e: any) => {
          //   if (e.code === 'Enter') e.preventDefault()
          // }}
          helperText={formState.errors[name]?.message}
          register={register(name, { required, disabled })}
          label={label ?? ''}
          {...props}
          {...{ ...params, InputLabelProps: { ...params.InputLabelProps, shrink: true } }}
        />
      )}
      // renderOption={({ title }: Option) => (
      //   <Grid container wrap="nowrap" alignItems="center" key={title}>
      //     {optionIcon && (
      //       <Grid item style={{ fontSize: 18 }}>
      //         {optionIcon}
      //       </Grid>
      //     )}
      //
      //     <Grid item>
      //       <Typography variant="body1" style={{ color: 'inherit', lineHeight: 1.2, paddingLeft: '0.6em' }}>
      //         {title}
      //       </Typography>
      //     </Grid>
      //   </Grid>
      // )}
    />
  )
})
