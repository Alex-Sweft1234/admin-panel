import { withPrivateAPIToken, fetchPrivateAPIToken, apiFetchData } from './service'

export const signin = async (login: string, password: string) => fetchPrivateAPIToken(login, password)

export const auth = async () =>
  withPrivateAPIToken({
    url: '/admin/get',
    method: 'get',
  })
