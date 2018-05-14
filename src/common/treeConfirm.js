import { createConfirmation } from 'react-confirm';
import TreeModal from '../containers/TreeModal'

const treeConfirm = createConfirmation(TreeModal);

export default function (confirmation, options = {}) {
    return treeConfirm({ confirmation, options });
}