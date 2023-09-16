import { faList, faSortAlphaAsc } from '@fortawesome/free-solid-svg-icons';
import BubbleToggleIcon from './BubbleToggleIcon';

function BubbleToggleSwitch(props) {
    const { state, setState } = props;

    function togglestate() {
        if (state !== true) {
            setState(true);
        } else {
            setState(false);
        }
    }

    return (
        <div className="relative rounded-full bg-white outline outline-3 outline-black w-[100px] h-[50px] m-2">
            <BubbleToggleIcon pos='left' icon={faList} state={state} />
            <BubbleToggleIcon pos='right' icon={faSortAlphaAsc} state={state} />
            <div onClick={e => togglestate()}
                className={(state === true ? 'active ' : ' ') + " toggle-bubble absolute flex justify-center items-center rounded-full bg-red-400 outline outline-red-600 outline-3 w-[50px] h-[50px] cursor-pointer"}>
            </div>
        </div>
    )
}

export default BubbleToggleSwitch;
