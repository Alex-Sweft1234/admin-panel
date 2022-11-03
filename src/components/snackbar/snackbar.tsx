import React, { useEffect, useState } from 'react'
import { Grid, SnackbarContent, IconButton, Box, Collapse, useTheme } from '@mui/material'
import { Close, Warning, Info, Error, CheckCircle } from '@mui/icons-material'
import { SnackbarProps, messageVariants } from '../../types/default'
import { withPlanner, WithPlannerProps } from '../hoc'
import { str } from '../../utils'

type VariantProps = {
  variant: messageVariants
  message: string
}

export const Snackbar: React.FC<SnackbarProps & WithPlannerProps> = withPlanner(
  ({ variantMessage, message, onClose, planner, ...props }): JSX.Element => {
    const {
      palette: { success, warning, error, info },
    } = useTheme()
    const variant: messageVariants = message ? variantMessage : 'reset'
    const [variantState, setVariantState] = useState<VariantProps>({
      variant: 'reset',
      message: '',
    })

    const variantColor = { success, warning, error, info, reset: { main: 'white' } }
    const variantIcon = {
      success: CheckCircle,
      warning: Warning,
      error: Error,
      info: Info,
      reset: undefined,
    }

    const Icon = variantIcon[variantState.variant]
    const [animClass, setAnimClass] = useState<'zoomIn' | 'zoomOut'>('zoomIn')
    const [open, setOpen] = useState<boolean>(false)

    const handleClose = () => {
      setAnimClass('zoomOut')
      planner?.timeout(() => {
        setOpen(false)
        if (onClose) onClose()
      }, 150)
    }

    useEffect(() => {
      if (message && planner?.clearTimeouts()) {
        setVariantState({
          variant,
          message,
        })
        planner?.timeout(() => {
          setAnimClass('zoomIn')
          setOpen(true)
        }, 150)
      } else handleClose()
    }, [message])

    return (
      <Collapse in={open}>
        <Box className={`animated ${animClass} faster`}>
          <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <Box id="client-snackbar" color={variantColor[variantState.variant]?.main}>
                <Grid container justifyContent="space-between" wrap="nowrap" spacing={2} alignItems="center">
                  <Grid item>{Icon && <Icon color="inherit" style={{ fontSize: 24 }} />}</Grid>

                  <Grid item>
                    {!!variantState.message &&
                      Object.entries(variantState.message).map(([_, val], idx) => (
                        <Box key={`snackbar-message-${idx}`}>
                          {Array.isArray(val) ? (
                            val.map((v, i) => <p key={i}>{str.normalize(v)}</p>)
                          ) : (
                            <p id="1">{str.normalize(val)}</p>
                          )}
                        </Box>
                      ))}
                  </Grid>

                  <Grid item>
                    <IconButton
                      key="close"
                      color="error"
                      aria-label="close"
                      onClick={handleClose}
                      style={{ marginRight: -12 }}
                    >
                      <Close style={{ fontSize: 24 }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            }
            {...props}
          />
        </Box>
      </Collapse>
    )
  }
)
