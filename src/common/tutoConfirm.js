import { createConfirmation } from 'react-confirm';
import TreeModal from '../containers/TutoModal'

const tutoConfirm = createConfirmation(TreeModal);

export default function (confirmation, options = {}) {
    return tutoConfirm({ confirmation, options });
}