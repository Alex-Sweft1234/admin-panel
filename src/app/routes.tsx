import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MainPage, SigninPage } from '../pages'

export const RoutesRoot: React.FC = (): JSX.Element => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route key="index" path="/" element={<MainPage />} />
      <Route key="signin" path="signin" element={<SigninPage />} />
    </Routes>
  )
}
