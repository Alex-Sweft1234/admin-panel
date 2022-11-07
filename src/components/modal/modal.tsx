import React from 'react'
import {
  DialogProps as DialogPropsDefault,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
  DialogTitle,
  IconButton,
  Button,
  Theme,
  Box,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { str } from '../../utils'

export interface DialogProps {
  processed?: boolean
  open?: boolean
  name?: string
  closeButton?: boolean
  actionButtonText?: string
  onClose?: () => void
  onOpen?: () => void
  hidden?: boolean
}

export const Modal: React.FC<DialogProps & DialogPropsDefault> = (props): JSX.Element => {
  const {
    title = undefined,
    name = 'default',
    processed = false,
    onClose = () => {},
    onOpen = () => {},
    fullScreen = false,
    closeButton = true,
    actionButtonText = '',
    children,
    maxWidth = 'sm',
    hidden = false,
  } = props

  const dialogTitleId = `${name}-dialog-title`
  const dialogBodyId = `${name}-dialog-body`
  const sm = useMediaQuery(({ breakpoints: { down } }: Theme) => down('sm'))

  return (
    <Dialog
      {...props}
      title={undefined}
      aria-labelledby={dialogTitleId}
      fullScreen={fullScreen || sm}
      scroll="body"
      maxWidth={maxWidth}
      hidden={hidden}
    >
      {title && <DialogTitle id={dialogTitleId}>{str.normalize(title)}</DialogTitle>}

      {closeButton && (
        <Box position="absolute" top={15} right={15}>
          <IconButton color="primary" disabled={processed} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <DialogContent id={dialogBodyId}>{children}</DialogContent>

      {actionButtonText.length > 0 && (
        <DialogActions>
          <Box mx="auto" mt={2}>
            <Button autoFocus onClick={onClose} variant="contained" color="primary">
              {actionButtonText}
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  )
}
