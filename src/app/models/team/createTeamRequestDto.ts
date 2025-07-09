import { MembershipDto } from "../memberships/membershipDto"

export interface CreateTeamRequestDto {
    name: string
    memberships: MembershipDto[]
}