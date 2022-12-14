import * as ls from 'local-storage'
import axios, { AxiosRequestConfig } from 'axios'
import { ApiAnswerStatus, TOKEN } from '../types/default'

const { REACT_APP_API_URL = '/', REACT_APP_API_AUTH } = process.env

const axiosClient = axios.create({
  baseURL: `${REACT_APP_API_URL.replace(/^\/+/, '')}/`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Basic ${REACT_APP_API_AUTH}`,
  },
})

export const apiFetchData = async (config: AxiosRequestConfig) => {
  return await axiosClient
    .request(config)
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      if (e.response.status === ApiAnswerStatus.BAD_REQUEST) {
        return e.response
      }
      throw e
    })
}

export const fetchPrivateAPIToken = async (username: string, password: string) => {
  return await apiFetchData({
    url: '/admin/login',
    method: 'post',
    data: { username, password },
  })
    .then((res) => {
      ls.set(TOKEN.PRIVATE, res.data)
    })
    .catch((e) => {
      if (e.response.status === ApiAnswerStatus.UNAUTHENTICATED) {
        throw e.response.data
      }
      throw e
    })
}

export const withPrivateAPIToken = async (config: AxiosRequestConfig) => {
  const token = ls.get<{ access_token?: string }>(TOKEN.PRIVATE)

  if (!(token && token.access_token)) {
    return apiFetchData(config)
  } else {
    return await apiFetchData({
      ...config,
      headers: { Authorization: `Bearer ${token.access_token}` },
    })
      .then((res) => {
        return res
      })
      .catch((e) => {
        if (e.response.status === ApiAnswerStatus.UNAUTHENTICATED) {
          ls.remove(TOKEN.PRIVATE)
          throw e.response.data
        } else if (e.response.status === ApiAnswerStatus.NEED_FULL_REGISTER) {
          throw e.response.data
        }
        throw e
      })
  }
}
