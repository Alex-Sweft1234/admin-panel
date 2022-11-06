import React from 'react'
import { Navigate } from 'react-router-dom'
import { useReduxSelector } from '../../hooks'
import { Preloader } from '../preloader'

interface PropType {
  component: React.FC
}

export const PrivateRoute: React.FC<PropType> = ({ component: Component }) => {
  const { loading, auth } = useReduxSelector((state) => state.auth)

  switch (true) {
    case loading:
      return <Preloader />
    case !auth:
      return <Navigate to="/login" />
    default:
      return <Component />
  }
}
