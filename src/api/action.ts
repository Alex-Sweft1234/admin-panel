import * as ls from 'local-storage'
import { withPrivateAPIToken, fetchPrivateAPIToken } from './service'
import { TOKEN } from '../types/default'

export const signin = async (login: string, password: string) => fetchPrivateAPIToken(login, password)

export const auth = async () =>
  withPrivateAPIToken({
    url: '/admin/get',
    method: 'get',
  })

export const logout = () => {
  ls.remove(TOKEN.PRIVATE)
}

export const getChartUsers = async () =>
  withPrivateAPIToken({
    url: '/admin/users/chart/get',
    method: 'get',
  })

export const getUsers = async (page: number, perPage: number) =>
  withPrivateAPIToken({
    url: `/admin/users/get?page=${page}&perPage=${perPage}`,
    method: 'get',
  })
