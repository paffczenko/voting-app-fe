import {CandidateDto} from "../../../types/candidate";
import {VoterDto} from "../../../types/voter";
import {FC, useState} from "react";

type VoteProps = {
    candidates?: CandidateDto[];
    voters?: VoterDto[];
    onSubmit: (candidateId: string, voterId: string) => Promise<void>;
}

const Vote:FC<VoteProps> = (props) => {
    const [selectedVoter, setSelectedVoter] = useState<string>();
    const [selectedCandidate, setSelectedCandidate] = useState<string>();
    return (
        <div className="w-full flex space-x-6">
            <select onChange={(e) => setSelectedVoter(e.currentTarget.value)}>
                <option value="" disabled selected>I am</option>
                {props.voters?.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
            <select onChange={(e) => setSelectedCandidate(e.currentTarget.value)}>
                <option value="" disabled selected>I vote for</option>
                {props.candidates?.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
            <button className="border rounded p-1" disabled={!selectedVoter || !selectedCandidate} type="button" onClick={() => {
                if(selectedCandidate && selectedVoter) {
                    void props.onSubmit(selectedCandidate, selectedVoter);
                }
            }}>Submit</button>
        </div>
    )
}

export default Vote;
