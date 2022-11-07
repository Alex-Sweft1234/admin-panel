import React from 'react'
import { Hidden } from '@mui/material'
import { DesktopMenu } from './desktop-menu'
import { MobileMenu } from './mobile-menu'

export const MenuRoot: React.FC = (): JSX.Element => {
  return (
    <>
      <Hidden mdDown>
        <DesktopMenu />
      </Hidden>
      <Hidden mdUp>
        <MobileMenu />
      </Hidden>
    </>
  )
}
