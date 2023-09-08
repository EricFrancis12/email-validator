import { useState } from "react";

function EmailValidator() {
    const [emails, setEmails] = useState([]);
    const [validEmails, setValidEmails] = useState([]);
    const [invalidEmails, setInvalidEmails] = useState([]);



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
            if (item.valid === true) {
                valids.push(item.email);
            } else {
                invalids.push(item.email);
            }
        });

        setValidEmails(valids);
        setInvalidEmails(invalids);
    }



    return (
        <div>
            <div>
                <h1>Validate Your Email Addresses</h1>
            </div>
            <div>
                <input type="file" accept=".txt" onInput={e => handleUpload(e.target.files[0])}></input>
            </div>
            <div>
                <textarea onInput={e => setEmails([...e.target.value.split('\n')])}
                    value={textareaValue(emails)}>
                </textarea>
            </div>
            <div>
                <button onClick={e => validateEmails(emails)}>Validate</button>
            </div>
            <div>
                <textarea contentEditable="false"
                    value={textareaValue(validEmails)}>
                </textarea>
            </div>
            <div>
                <textarea contentEditable="false"
                    value={textareaValue(invalidEmails)}>
                </textarea>
            </div>
        </div >
    )
}

export default EmailValidator;
