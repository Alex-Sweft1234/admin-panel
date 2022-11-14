import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { numericInputProps } from './props-autocomplete'
import { GenericTextInput } from './generic-text-input'

type Props = {
  form: UseFormReturn<any>
  name: string
  variant?: 'standard' | 'filled' | 'outlined'
  placeholder?: string
  disabled?: boolean
  label?: string
  required?: boolean
}

// export const PhoneInput: React.FC<Props> = ({
//   form,
//   name,
//   variant = 'outlined',
//   placeholder,
//   required = true,
//   disabled = false,
//   label = 'Телефон',
// }): JSX.Element => {
//   const { control, formState } = form
//
//   return (
//     <Controller
//       name="phone"
//       control={control}
//       defaultValue=""
//       render={({ field: { onChange, onBlur, value } }) => (
//         <InputMask mask="+7(999) 999-99-99" value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}>
//           {(inputProps: any) => (
//             <GenericTextInput
//               {...inputProps}
//               placeholder={placeholder}
//               label={label}
//               variant={variant}
//               type="tel"
//               InputProps={{
//                 inputProps: { ...(numericInputProps as any) },
//               }}
//               helperText={formState.errors[name]?.message}
//             />
//           )}
//         </InputMask>
//       )}
//     />
//   )
// }
