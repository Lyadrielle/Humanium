import { createConfirmation } from 'react-confirm';
import TutoModal from '../containers/TutoModal'

const tutoConfirm = createConfirmation(TutoModal);

export default function (confirmation, options = {}) {
    return tutoConfirm({ confirmation, options });
}