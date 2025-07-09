import { MembershipDto } from "../memberships/membershipDto"

export interface TeamCommandRequestDto {
    name: string
    memberships: MembershipDto[]
}