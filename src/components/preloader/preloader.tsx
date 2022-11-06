import React from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const Preloader: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container justifyContent="center" alignItems="center" className={classes.page}>
      <Grid item>
        <div className="loadingio-spinner-ripple-ebhm9ege9r7">
          <div className="ldio-p7r8fspzu69">
            <div></div>
            <div></div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  page: { height: '100vh' },
}))
