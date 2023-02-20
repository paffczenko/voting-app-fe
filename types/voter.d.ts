export type VoterDto = {
    id: string;
    name: string;
    hasVoted: boolean;
}

export type CreateVoterRequest = {
    name: string;
}
