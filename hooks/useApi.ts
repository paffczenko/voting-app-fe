import {CandidateDto, CreateCandidateRequest} from "../types/candidate";
import {CreatedId} from "../types/shared";
import {CreateVoterRequest, VoterDto} from "../types/voter";
import {CreateVoteRequest} from "../types/vote";
import {useCallback} from "react";
import useSWR, {SWRResponse} from "swr";

export const useGetVoters = (): SWRResponse<VoterDto[], Error> =>
        useSWR(['Voter'], () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/voter`)
    .then(async res => (await res.json()) as VoterDto[])
        );

export const useGetCandidates = (): SWRResponse<CandidateDto[], Error> =>
    useSWR(['Candidate'], () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidate`)
        .then(async res => (await res.json()) as CandidateDto[])
    );

export const useApi = () => {
    const createCandidate = useCallback(
        (request: CreateCandidateRequest) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidate`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(async (res) => (await res.json()) as CreatedId), []);

    const createVoter = useCallback(
        (request: CreateVoterRequest) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/voter`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
    }).then(async (res) => (await res.json()) as CreatedId), []);

    const createVote = useCallback(
        (request: CreateVoteRequest) => fetch(`${process.env.NEXT_PUBLIC_API_URL}/vote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
    }), []);

    return {
        createCandidate,
        createVoter,
        createVote
    }
}
