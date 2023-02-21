import {VoterDto} from "../../../types/voter";
import {FC, useCallback, useRef, useState} from "react";

type VotersTableProps = {
    onAddVoter: (name: string) => Promise<void>;
    items?: VoterDto[];
}

const VotersTable: FC<VotersTableProps> = (props) => {
    const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCreateVoter = useCallback(async () => {
        if(inputRef.current != null) {
            await props.onAddVoter(inputRef.current.value);
            setIsAddButtonClicked(false);
        }

        await Promise.reject();
    }, [props]);
    
    return (<table className="table-auto text-center w-full">
        <caption>
            Voters
        </caption>
        <thead>
        <tr>
            <th className="border">Name</th>
            <th className="border">Has voted</th>
            <th className="cursor-pointer text-center" onClick={() => !isAddButtonClicked && setIsAddButtonClicked(true)}>+</th>
        </tr>
        </thead>
        <tbody>
            {props.items && props.items.map(voter => <tr key={voter.id}>
                <td className="border">{voter.name}</td>
                <td className="border">{voter.hasVoted ? 'v' : 'x'}</td>
            </tr>)}
            {isAddButtonClicked && <tr>
                <td className="border ">
                    <input ref={inputRef} className="focus:outline-none" type="text" />
                </td>
                <td className="border">
                    <a className="cursor-pointer" onClick={handleCreateVoter}>Zapisz </a>
                    <a className="cursor-pointer" onClick={() => setIsAddButtonClicked(false)}>Anuluj</a>
                </td>
            </tr>}
        </tbody>
    </table>)
};

export default VotersTable;
