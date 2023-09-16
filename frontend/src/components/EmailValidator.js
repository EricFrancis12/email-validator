import { useState } from "react";
import EmailValidationData from "./EmailValidationData";

function EmailValidator() {
    const [emails, setEmails] = useState([]);

    const [validEmailsData, setValidEmailsData] = useState([{ email: 'test@test.com' }, { email: 'example@test.com' }, { email: 'jim@fun.com' }, { email: 'bart@ok.org' }]);
    const [invalidEmailsData, setInvalidEmailsData] = useState([{ email: 'test@test.com' }, { email: 'example@test.com' }, { email: 'jim@fun.com' }, { email: 'bart@ok.org' }]);



    function handleUpload(txtFile) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target.result;
            const emailArray = fileContent.split('\n').map(email => email.trim());
            setEmails([...emails, ...emailArray]);
        };

        reader.readAsText(txtFile);
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

        setValidEmailsData(valids);
        setInvalidEmailsData(invalids);
    }

    function textareaValue(arr) {
        return arr.map((item, index) => `${item}${arr.length - 1 === index ? '' : '\n'}`).join('')
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
                    <EmailValidationData emailData={validEmailsData} setEmailData={setValidEmailsData} heading={'Valid Emails: '} />
                    <EmailValidationData emailData={invalidEmailsData} setEmailData={setInvalidEmailsData} heading={'Invalid Emails: '} />
                </div>
            </div >
        </div>
    )
}

export default EmailValidator;
