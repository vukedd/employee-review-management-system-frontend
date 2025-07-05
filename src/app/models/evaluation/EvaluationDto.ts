import { questionDto } from "../question/questionDto";

export interface EvaluationDto {
    type: number | undefined,
    questions: questionDto[]
}