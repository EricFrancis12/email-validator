import OutputButton from './OutputButton';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function CopyButton(props) {
    const { copyString } = props;

    function copyToClipboard(copyString) {
        const textArea = document.createElement("textarea");
        textArea.value = copyString;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    return (
        <OutputButton icon={faCopy} text="copy"
            onClickFunction={e => copyToClipboard(copyString)} />
    )
}

export default CopyButton;
