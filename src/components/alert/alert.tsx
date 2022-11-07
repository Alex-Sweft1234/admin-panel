import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  Theme,
  Collapse,
  IconButton,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useReduxDispatch } from '../../hooks'
import { modalsAction } from '../../store/modals'
import { AlertProps, Message } from '../../types/default'
import { str } from '../../utils'
import { withPlanner, WithPlannerProps } from '../hoc'

export const Alert: React.FC<AlertProps & WithPlannerProps> = withPlanner((props): JSX.Element => {
  const {
    title = 'Информация',
    fullScreen = false,
    closeButton = true,
    actionButtonText = 'OK',
    message = undefined,
    onAction,
    onClose,
    rootModal,
  } = props

  const dispatch = useReduxDispatch()
  const [text, setText] = useState<Message>([])
  const sm = useMediaQuery(({ breakpoints: { down } }: Theme) => down('sm'))

  const handleClose = () => {
    if (onClose) onClose()
    dispatch(modalsAction.alert({}))
  }

  useEffect(() => {
    if (message) {
      setText(message)
      if (rootModal) dispatch(modalsAction.modal({ modal: { [rootModal]: { show: false, params: undefined } } }))
    } else handleClose()
  }, [message])

  return (
    <Dialog
      {...props}
      title={undefined}
      open={!!message}
      maxWidth="sm"
      scroll="body"
      aria-labelledby="global-alert"
      fullScreen={fullScreen || sm}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') handleClose()
      }}
    >
      {title && <DialogTitle id="alert-title">{title}</DialogTitle>}

      {closeButton && (
        <Box position="absolute" top={15} right={15}>
          <IconButton color="primary" disabled={false} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      <DialogContent id="alert-content">
        <Collapse in={!!message}>
          <Box textAlign="center" mt={4} mb={2} px={{ xs: 0, sm: 3 }} lineHeight={1.3} boxSizing="border-box">
            {!!text &&
              Object.entries(text).map(([_, val], idx) => (
                <Box key={`alert-message-${idx}`}>
                  {Array.isArray(val) ? (
                    val.map((v, i) => <p key={i}>{str.normalize(v, true)}</p>)
                  ) : (
                    <p>{str.normalize(val, true)}</p>
                  )}
                </Box>
              ))}
          </Box>
        </Collapse>
      </DialogContent>

      {actionButtonText.length > 0 && (
        <DialogActions id="alert-actions">
          <Box mx="auto" mt={1} maxWidth={sm ? 230 : 250} width="100%">
            <Button
              fullWidth
              onClick={() => {
                if (onAction) {
                  onAction()
                  handleClose()
                } else handleClose()
              }}
              variant="contained"
              color="secondary"
            >
              {actionButtonText}
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  )
})
