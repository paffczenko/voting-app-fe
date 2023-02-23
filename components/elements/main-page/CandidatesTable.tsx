import {CandidateDto} from "../../../types/candidate";
import {FC, useCallback, useRef, useState} from "react";

type CandidatesTableProps = {
    onAddCandidate: (name: string) => Promise<void>;
    items?: CandidateDto[];
}

const CandidatesTable: FC<CandidatesTableProps> = (props) => {
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddVoter = useCallback(async () => {
        if(inputRef.current != null) {
            await props.onAddCandidate(inputRef.current.value);
            setIsAddButtonClicked(false);
        }
        await Promise.reject();
    }, [props]);

    return (
        <table className="w-full text-center table-auto">
            <caption>Candidates</caption>
            <thead>
                <tr>
                    <th className="border">Name</th>
                    <th className="border">Votes</th>
                    <th onClick={() => setIsAddButtonClicked(true)} className="cursor-pointer text-center">+</th>
                </tr>
            </thead>
            <tbody>
            {props.items && props.items.map(x => <tr key={x.id}>
                <td className="border">
                    {x.name}
                </td>
                <td className="border">
                    {x.votesCount}
                </td>
            </tr>)}
            {isAddButtonClicked && <tr>
                <td className="border ">
                    <input ref={inputRef} className="focus:outline-none" type="text" />
                </td>
                <td className="border">
                    <a className="cursor-pointer" onClick={handleAddVoter}>Zapisz </a>
                    <a className="cursor-pointer" onClick={() => setIsAddButtonClicked(false)}>Anuluj</a>
                </td>
            </tr>}
            </tbody>
        </table>
    )
}

export default CandidatesTable;
