import VotersTable from "../components/elements/main-page/VotersTable";
import CandidatesTable from "../components/elements/main-page/CandidatesTable";
import Vote from "../components/elements/main-page/Vote";
import {useApi, useGetCandidates, useGetVoters} from "../hooks/useApi";
import {useCallback} from "react";

const IndexPage = () => {
    const { data: candidates, mutate: mutateCandidates } = useGetCandidates();
    const { data: voters, mutate: mutateVoters } = useGetVoters();
    const { createVote, createVoter, createCandidate } = useApi();

    const handleSubmitVote = useCallback(async (candidateId: string, voterId: string) => {
        await createVote({ candidateId: candidateId, voterId: voterId });
        await mutateCandidates();
        await mutateVoters();
    }, [createVote, mutateCandidates, mutateVoters]);

    const handleAddVoter = useCallback(async (name: string) => {
        await createVoter({name: name});
        await mutateVoters();
    }, [createVoter, mutateVoters]);

    const handleAddCandidate = useCallback(async (name: string) => {
        await createCandidate({name: name});
        await mutateCandidates();
    }, [createCandidate, mutateCandidates]);

    return (
        <>
            <div className="max-w-screen-lg mx-auto mt-10">
                <div className="flex space-x-10 w-full flex flex-col">
                    Voting app
                    <div className="w-full flex text-left space-x-10">
                        <VotersTable items={voters} onAddVoter={handleAddVoter} />
                        <CandidatesTable items={candidates} onAddCandidate={handleAddCandidate} />
                    </div>
                </div>
                <div className="w-full mt-20">
                    Vote!
                    { candidates && voters
                        && <Vote candidates={candidates}
                             voters={voters}
                             onSubmit={(candidateId, voterId) => handleSubmitVote(candidateId, voterId)
                             }
                    /> }
                </div>
            </div>
        </>
    )
}

export default IndexPage;
