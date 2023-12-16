import { Comment } from './Video'

export interface layoutProps {
    children: React.ReactNode
}
export interface CommentLayoutProps {
    comments: Comment[]
    videoId: number
}
