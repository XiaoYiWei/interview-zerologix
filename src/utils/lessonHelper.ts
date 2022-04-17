import { parse } from 'date-fns'
import { apiInstance } from './axios'

type Meta = {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: string
    to: number
    total: number
}
export type LessonRawData = {
    id: number
    title: string
    created_at: string
    content: string
    favourited: boolean
}
type LessonContent = {
    blocks: {
        key: string
        text: string
        type: string
        depth: number
    }[]
    entityMap: undefined[]
}

export interface LessonData
    extends Omit<LessonRawData, 'created_at' | 'content'> {
    created_at: Date
    content: LessonContent
}

type Response = {
    data: LessonData[]
    meta: Meta
}

/*
 *  轉換日期與content的內容
 */
export function transformData(response: any) {
    const result: Response = {
        data: [],
        meta: JSON.parse(response).meta,
    }
    const obj = JSON.parse(response)
    const dataSet = obj.data as LessonRawData[]
    ;(dataSet ?? []).map((lesson) => {
        const newItem: LessonData = {
            ...lesson,
            content: JSON.parse(lesson.content.replace(/\//g, '')),
            created_at: parse(
                lesson.created_at,
                'yyyy-MM-dd HH:mm:ss',
                new Date()
            ),
        }
        result.data.push(newItem)
        return true
    })
    return result
}

export function fetchUnregisteredLessons({ pageParam = 1 }) {
    return apiInstance.get<Response>(
        `/post/analysis?per_page=12&page=${pageParam}`,
        {
            transformResponse: [
                (data) => {
                    return transformData(data)
                },
            ],
        }
    )
}

export function fetchRegisteredLessons({ pageParam = 1 }) {
    return apiInstance.get<Response>(`/me/user/favourite/post-analysis`, {
        transformResponse: [
            (data) => {
                return transformData(data)
            },
        ],
    })
}
