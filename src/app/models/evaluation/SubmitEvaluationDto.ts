import { UserDto } from "../auth/userDto";
import { ResponseDto } from "../response/responseDto";

export interface SubmitEvaluationDto {
    id: number,
    responses: ResponseDto[],
    reviewee: UserDto,
    reviewer: UserDto
}