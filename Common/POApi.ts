import { ZIO } from '@mxt/zio'
import { HttpClient } from '@mxt/zio-http-client'
import { AxiosRequestConfig } from 'axios'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'

export namespace POApi {
  export const buildUrl = (restUrl: string) => {
    return pipe(
      ZIO.effect(() => {
        const prefixUrl = `https://hacker-news.firebaseio.com/v0/`
        return `${prefixUrl}/${restUrl}`
      })
    )
  }

  export const get = (url: string, config: AxiosRequestConfig = {}) => <C extends t.Mixed>(response: C) =>
    pipe(
      buildUrl(url),
      ZIO.flatMap((apiUrl) => HttpClient.get({
        ...config,
        headers: {
          ...config.headers
        }
      })(apiUrl, response)
      )
    )
}