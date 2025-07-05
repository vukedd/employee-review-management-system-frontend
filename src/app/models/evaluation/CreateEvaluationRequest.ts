import { QuestionRequestDto } from "../question/quesionRequestDto";

export interface CreateEvaluationRequest {
    type: number | undefined,
    questions: QuestionRequestDto[]
}