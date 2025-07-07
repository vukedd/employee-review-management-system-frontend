export interface FeedbackDto {
    reviewee: string | undefined,
    reviewer: string | undefined | null,
    content: string | undefined,
    visibility: number
}