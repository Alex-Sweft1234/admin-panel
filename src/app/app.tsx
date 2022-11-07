import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthAction } from '../store/auth'
import { RoutesRoot } from './routes'
import { useReduxDispatch } from '../hooks'
import { Layout } from '../components'

export const App = () => {
  const dispatch = useReduxDispatch()

  useEffect(() => {
    dispatch(AuthAction({}))
  }, [])
  return (
    <Layout>
      <RoutesRoot />
    </Layout>
  )
}
