export type CandidateDto = {
    id: string;
    name: string;
    votesCount: number;
}

export type CreateCandidateRequest = {
    name: string;
}
