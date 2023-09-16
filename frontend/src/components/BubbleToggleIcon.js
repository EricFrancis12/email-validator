import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BubbleToggleIcon(props) {
    const { pos, icon, state } = props;

    const opacityTrue = pos === 'right' ? ' ' : ' opacity-50 ';
    const opacityFalse = pos === 'right' ? ' opacity-50 ' : ' ';

    return (
        <div className={(pos === 'right' ? ' right-0 ' : ' left-0 ') + " absolute flex justify-center items-center rounded-full bg-white w-[50px] h-[50px]"}>
            <FontAwesomeIcon icon={icon || (pos === 'right' ? faCheck : faX)} className={(state === true ? opacityTrue : opacityFalse) + " z-10 pointer-events-none"} />
        </div>
    )
}

export default BubbleToggleIcon;
