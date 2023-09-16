import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function OutputButton(props) {
    const { icon, text, onClickFunction } = props;

    return (
        <button onClick={e => onClickFunction()}
            className="flex items-center gap-1 bg-green-500 h-10 p-2 border border-black rounded-lg hover:opacity-80">
            <FontAwesomeIcon icon={icon} className="cursor-pointer" />
            <span>{text}</span>
        </button>
    )
}

export default OutputButton;
