import { QuestionRequestDto } from "../question/quesionRequestDto";

export interface CreateEvaluationRequest {
    name: string
    type: number | undefined,
    questions: QuestionRequestDto[]
}