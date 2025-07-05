import { QuestionCategory } from "../../enums/question/questionCategory";
import { QuestionType } from "../../enums/question/questionType";

export interface questionDto {
    content: string,
    type: QuestionType,
    category: QuestionCategory,
}