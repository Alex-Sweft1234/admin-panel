import React from 'react'
import { Button, ButtonProps, CircularProgress, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import classNames from 'classnames'

type ButtonPropsCustom = ButtonProps & { processed?: boolean }

const useStyles = makeStyles(({ spacing }: Theme) => ({
  actionSubmit: {},
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: '#ffffff!important',
    marginTop: spacing(-3 / 2),
    marginLeft: spacing(-3 / 2),
  },
}))

export const SubmitButton: React.FC<ButtonPropsCustom> = ({
  className,
  onClick = () => {},
  processed = false,
  disabled = false,
  title,
  type = 'submit',
  variant = 'contained',
  color = 'primary',
  ...props
}) => {
  const classes = useStyles()

  return (
    <Button
      className={classNames(classes.actionSubmit, className)}
      onClick={onClick}
      type={type}
      variant={variant}
      color={color}
      disabled={disabled || processed}
      {...props}
    >
      {title || props.children}
      {processed && <CircularProgress size={24} className={classes.buttonProgress} />}
    </Button>
  )
}
