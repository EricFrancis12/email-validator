import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import TxtButton from "./TxtButton";
import CsvButton from "./CsvButton";
import CopyButton from "./CopyButton";
import BubbleToggleSwitch from "./BubbleToggleSwitch";

function EmailValidationData(props) {
    const { emailData, setEmailData, heading } = props;

    const [origEmailData, setOrigEmailData] = useState(emailData);
    useEffect(() => setOrigEmailData(emailData), [emailData]);

    const [isAlphabetized, setIsAlphabetized] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmailData, setFilteredEmailData] = useState(emailData);
    const [selectedEmailData, setSelectedEmailData] = useState(null);
    useEffect(() => updateDisplay(), [emailData, origEmailData, isAlphabetized, searchQuery]);



    function updateDisplay() {
        let result = [...emailData];

        if (isAlphabetized === true) {
            result = alphSort(result);
        } else {
            result = [...origEmailData];
        }

        if (searchQuery) {
            result = result.filter(item => item.email.includes(searchQuery));
        }

        setFilteredEmailData(result);
        setSelectedEmailData(null);
    }

    function toggleSelected(e, index) {
        if (e.target.classList.contains('no-toggle')) return null;

        if (selectedEmailData === index) {
            return setSelectedEmailData(null);
        }
        setSelectedEmailData(index);
    }

    function alphSort(list) {
        const listCopy = [...list];
        listCopy.sort((a, b) => {
            const emailA = a.email.toLowerCase();
            const emailB = b.email.toLowerCase();

            if (emailA < emailB) return -1;
            if (emailA > emailB) return 1;
            return 0;
        });

        return listCopy;
    }

    function txtString(emailData) {
        return emailData.map(item => item.email).join('\n');
    }

    function csvString(emailData) {
        return;
    }



    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="flex gap-2 pb-2">
                    <h3 className="mb-6">
                        {heading}
                    </h3>
                    <input className="p-1" placeholder="search..." onChange={e => setSearchQuery(e.target.value)}></input>
                    <BubbleToggleSwitch state={isAlphabetized} setState={setIsAlphabetized} />
                </div>
                <div className="flex flex-col gap-2 bg-white w-[500px] h-[200px] p-2 overflow-scroll">
                    {filteredEmailData?.length > 0
                        ? filteredEmailData.map((emailData, index) => {
                            return (
                                <div className="bg-green-400" key={index}>
                                    <div className="flex p-1 cursor-pointer" onClick={e => toggleSelected(e, index)}>
                                        <a className="no-toggle hover:opacity-60" href={'mailto:' + emailData.email}>
                                            <FontAwesomeIcon icon={faEnvelope} className="no-toggle pr-2 pointer-events-none" />
                                        </a>
                                        <span className="flex flex-grow justify-between items-center">
                                            <span>{emailData.email}</span>
                                            {selectedEmailData === index
                                                ? <FontAwesomeIcon icon={faChevronUp} />
                                                : <FontAwesomeIcon icon={faChevronDown} />}
                                        </span>
                                    </div>
                                    {selectedEmailData === index
                                        ? <div className="active dropdown-item pl-2 pr-2 bg-green-300 overflow-hidden">
                                            <div className="p-2">
                                                Dropdown Content
                                            </div>
                                        </div>
                                        : <div className="dropdown-item pl-2 pr-2 bg-green-300 overflow-hidden">
                                            <div className="p-2">
                                                Dropdown Content
                                            </div>
                                        </div>}
                                </div>
                            )
                        })
                        : <span></span>}
                </div>
            </div>
            <div className="flex flex-col justify-end gap-2 mt-2 ml-1">
                {emailData?.length > 0
                    ? <>
                        <TxtButton txtString={txtString(emailData)} />
                        <CsvButton csvString={csvString(emailData)} />
                        <CopyButton copyString={txtString(emailData)} />
                    </>
                    : ''}
            </div>
        </div>
    )
}

export default EmailValidationData;
