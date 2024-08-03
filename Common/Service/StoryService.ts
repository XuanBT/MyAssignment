import { pipe } from 'fp-ts/lib/function'
import { POApi } from '../POApi'
import * as t from 'io-ts'
import { ZIO } from '@mxt/zio'
import { Maybe } from '@mxt/zio/codec'
export namespace StoryService {
  export const StoryDetailInfo = t.type({
    id: t.number,
    score: t.number,
    time: t.number,
    title: t.string,
    type: t.string,
    by: Maybe(t.string),
    kids: Maybe(t.array(t.number)),
    text: Maybe(t.string),
    url: Maybe(t.string),
  })

  export const CommentDetailInfo = t.type({
    id: t.number,
    text: Maybe(t.string),
    time: t.number,
    by: Maybe(t.string)
  })

  export type StoryDetailInfo = t.TypeOf<typeof StoryDetailInfo>

  export const getNewStoryIDList = () => pipe(
    POApi.get(`newstories.json?print=pretty`)(t.array(t.number)),
    ZIO.map((responseData) => {
      return responseData
    })
  )

  export const getStoryDetail = (storyID: string) => pipe(
    POApi.get(`item/${storyID}.json?print=pretty`)(StoryDetailInfo),
    ZIO.map((responseData) => {
      return responseData
    })
  )

  export const getBestStoryIDList = () => pipe(
    POApi.get(`beststories.json?print=pretty`)(t.array(t.number)),
    ZIO.map((responseData) => {
      return responseData
    })
  )

  export const getTopStoryIDList = () => pipe(
    POApi.get(`topstories.json?print=pretty`)(t.array(t.number)),
    ZIO.map((responseData) => {
      return responseData
    })
  )

  export const getCommentDetail = (commentID: string) => pipe(
    POApi.get(`item/${commentID}.json?print=pretty`)(CommentDetailInfo),
    ZIO.map((responseData) => {
      return responseData
    })
  )
}