import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileText, faFileCsv, faCopy, faMailBulk, faMailForward, faMailReplyAll, faMessage, faEnvelopeOpen, faEnvelope, faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function EmailValidator() {
    const [emails, setEmails] = useState([]);
    const [validEmailsData, setvalidEmailsData] = useState([{ email: 'test@test.com' }, { email: 'example@test.com' }]);
    const [invalidEmailsData, setInvalidEmailsData] = useState([{ email: 'test@test.com' }, { email: 'example@test.com' }]);
    const [selectedValidEmailData, setSelectedValidEmailData] = useState();
    const [selectedInvalidEmailData, setSelectedInvalidEmailData] = useState();



    function handleUpload(txtFile) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target.result;
            const emailArray = fileContent.split('\n').map(email => email.trim());
            setEmails([...emails, ...emailArray]);
        };

        reader.readAsText(txtFile);
    }

    function textareaValue(arr) {
        return arr.map((item, index) => `${item}${arr.length - 1 === index ? '' : '\n'}`).join('')
    }

    async function validateEmails(emails) {
        const endpoint = '/validate';
        const res = await fetch(endpoint, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ data: emails })
        })
            .catch(err => console.error(err));
        const resJSON = await res.json();
        console.log(resJSON);

        const valids = [], invalids = [];
        resJSON.data.forEach(item => {
            if (item.email === '') return;

            if (item.valid === true) {
                valids.push(item);
            } else {
                invalids.push(item);
            }
        });

        setvalidEmailsData(valids);
        setInvalidEmailsData(invalids);
    }

    function downloadTxtFile(arr, fileName) {
        const txtString = arr.map(item => item.email).join('\n');
        const textBlob = new Blob([txtString], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(textBlob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName.split('.').pop() === 'txt' ? fileName : `${fileName}.txt`;
        a.click();

        URL.revokeObjectURL(blobUrl);
    }

    function downloadCsvFile(arr, fileName) {
        let header = ['email'];
        let body = '';
        arr.forEach(item => {
            for (const key in item) {
                if (!header.includes(key)) {
                    header.push(key.toString());
                }
            }
        });
        arr.forEach(item => {
            header.split(',').forEach(key => {
                if (item[key] != undefined) {
                    body += item[key].toString() + ',';
                }
            });
            body += '\n';
        });
        const csvString = header + '\n' + body;
        const csvBlob = new Blob([csvString], { type: 'text/csv' });

        const blobUrl = URL.createObjectURL(csvBlob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName.split('.').pop() === 'csv' ? fileName : `${fileName}.csv`;
        a.click();

        URL.revokeObjectURL(blobUrl);
    }

    function copyToClipboard(emailsData) {
        const textArea = document.createElement("textarea");
        textArea.value = emailsData.map(item => item.email).join('\n');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    function toggleSelected(e, index, stateVar, stateFunc) {
        if (e.target.classList.contains('no-toggle')) return null;

        if (stateVar === index) {
            return stateFunc(null);
        }
        stateFunc(index);
    }



    return (
        <div className="flex flex-col gap-4 items-center bg-slate-500">
            <div className="mb-4">
                <h1>Validate Your Email Addresses</h1>
            </div>
            <div className="flex flex-row items-top mb-4 overflow-auto">
                <div>
                    <div className="mb-4">
                        <input type="file" accept=".txt" onInput={e => handleUpload(e.target.files[0])}></input>
                    </div>
                    <div>
                        <textarea className="w-64 h-[500px] p-2 overflow-scroll" placeholder="enter email addresses here..." onInput={e => setEmails([...e.target.value.split('\n')])}
                            value={textareaValue(emails)}>
                        </textarea>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="bg-green-500 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => validateEmails(emails)}>Validate</button>
                        <button className="bg-yellow-500 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => setEmails([])}>Clear</button>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex">
                        <div className="flex flex-col">
                            <h3 className="mb-6">
                                Valid Emails:
                            </h3>
                            <div className="flex flex-col gap-2 bg-white w-[500px] h-[200px] p-2 overflow-scroll">
                                {validEmailsData.length > 0
                                    ? validEmailsData.map((emailData, index) => {
                                        return (
                                            <div className="bg-green-400" key={index}>
                                                <div className="flex p-1 cursor-pointer" onClick={e => toggleSelected(e, index, selectedValidEmailData, setSelectedValidEmailData)}>
                                                    <a className="no-toggle hover:opacity-60" href={'mailto:' + emailData.email}>
                                                        <FontAwesomeIcon icon={faEnvelope} className="no-toggle pr-2 pointer-events-none" />
                                                    </a>
                                                    <span className="flex flex-grow justify-between items-center">
                                                        <span>{emailData.email}</span>
                                                        {selectedValidEmailData === index
                                                            ? <FontAwesomeIcon icon={faChevronUp} />
                                                            : <FontAwesomeIcon icon={faChevronDown} />}

                                                    </span>
                                                </div>
                                                {selectedValidEmailData === index
                                                    ? <div className="active dropdown-item cubic-bezier pl-2 pr-2 bg-green-300 overflow-hidden">
                                                        <div className="p-2">
                                                            Dropdown Content
                                                        </div>
                                                    </div>
                                                    : <div className="dropdown-item cubic-bezier pl-2 pr-2 bg-green-300 overflow-hidden">
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
                            {validEmailsData.length > 0
                                ? <>
                                    <button className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => downloadTxtFile(validEmailsData, `invalid-emails-${Date.now()}.txt`)}>
                                        <FontAwesomeIcon icon={faFileText} className="cursor-pointer" />
                                        <span>.txt</span>
                                    </button>
                                    <button className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => downloadCsvFile(validEmailsData, `invalid-emails-${Date.now()}.csv`)}>
                                        <FontAwesomeIcon icon={faFileCsv} className="cursor-pointer" />
                                        <span>.csv</span>
                                    </button>
                                    <button className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => copyToClipboard(validEmailsData)}>
                                        <FontAwesomeIcon icon={faCopy} className="cursor-pointer" />
                                        <span>copy</span>
                                    </button>
                                </>
                                : ''}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col">
                            <h3 className="mb-6">
                                Invalid Emails:
                            </h3>
                            <div className="flex flex-col gap-2 bg-white w-[500px] h-[200px] p-2 overflow-scroll">
                                {invalidEmailsData.length > 0
                                    ? invalidEmailsData.map((emailData, index) => {
                                        return (
                                            <div className="bg-red-400" key={index}>
                                                <div className="flex p-1 cursor-pointer" onClick={e => toggleSelected(e, index, selectedInvalidEmailData, setSelectedInvalidEmailData)}>
                                                    <a className="no-toggle hover:opacity-60" href={'mailto:' + emailData.email}>
                                                        <FontAwesomeIcon icon={faEnvelope} className="no-toggle pr-2 pointer-events-none" />
                                                    </a>
                                                    <span className="flex flex-grow justify-between items-center">
                                                        <span>{emailData.email}</span>
                                                        {selectedInvalidEmailData === index
                                                            ? <FontAwesomeIcon icon={faChevronUp} />
                                                            : <FontAwesomeIcon icon={faChevronDown} />}

                                                    </span>
                                                </div>
                                                {selectedInvalidEmailData === index
                                                    ? <div className="active dropdown-item cubic-bezier pl-2 pr-2 bg-red-300 overflow-hidden">
                                                        <div className="p-2">
                                                            Dropdown Content
                                                        </div>
                                                    </div>
                                                    : <div className="dropdown-item cubic-bezier pl-2 pr-2 bg-red-300 overflow-hidden">
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
                            {invalidEmailsData.length > 0
                                ? <>
                                    <button className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => downloadTxtFile(invalidEmailsData, `invalid-emails-${Date.now()}.txt`)}>
                                        <FontAwesomeIcon icon={faFileText} className="cursor-pointer" />
                                        <span>.txt</span>
                                    </button>
                                    <button className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => downloadCsvFile(invalidEmailsData, `invalid-emails-${Date.now()}.csv`)}>
                                        <FontAwesomeIcon icon={faFileCsv} className="cursor-pointer" />
                                        <span>.csv</span>
                                    </button>
                                    <button className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80" onClick={e => copyToClipboard(invalidEmailsData)}>
                                        <FontAwesomeIcon icon={faCopy} className="cursor-pointer" />
                                        <span>copy</span>
                                    </button>
                                </>
                                : ''}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default EmailValidator;
