import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MainPage, LoginPage } from '../pages'
import { PrivateRoute } from '../components/private-route'

export const RoutesRoot: React.FC = (): JSX.Element => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route key="index" path="/" element={<PrivateRoute component={MainPage} />} />
      <Route key="login" path="login" element={<LoginPage />} />
    </Routes>
  )
}
