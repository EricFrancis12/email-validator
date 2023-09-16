import OutputButton from './OutputButton';
import { faFileText } from '@fortawesome/free-solid-svg-icons';

function TxtButton(props) {
    const { txtString } = props;

    function downloadTxtFile(txtString, fileName) {
        const textBlob = new Blob([txtString], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(textBlob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName.split('.').pop() === 'txt' ? fileName : `${fileName}.txt`;
        a.click();

        URL.revokeObjectURL(blobUrl);
    }

    return (
        <OutputButton icon={faFileText} text=".txt"
            onClickFunction={e => downloadTxtFile(txtString, `${Date.now()}.txt`)} />
    )
}

export default TxtButton;
