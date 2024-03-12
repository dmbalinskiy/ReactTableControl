import './button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function Button({handler, data, type, text, isEnabled= true}) {
    let icon = faEnvelope;
    if(type.includes('row') && type.includes('left')){
        icon = faArrowLeft;
    }
    else if(type.includes('row') && type.includes('right')){
        icon = faArrowRight;
    }
    else if(type.includes('column') && type.includes('left')){
        icon = faArrowUp;
    }
    else if(type.includes('column') && type.includes('right')){
        icon = faArrowDown;
    }
    else if(type.includes('delete') ){
        icon = faTrashCan;
    }
    else if(type.includes('export')){
        icon = faSave;
    }
    else if(type.includes('import')){
        icon = faDownload;
    }
    return (
        <button disabled={!isEnabled} className={`${isEnabled ? '' : 'disabled'} ${type}`} onClick={() => handler(data)}>
            <span>
                <FontAwesomeIcon className={`icon`} icon={icon} />
            </span>
        </button>
    );
}

export default Button;