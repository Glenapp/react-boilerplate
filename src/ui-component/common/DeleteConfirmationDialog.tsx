import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import ConfirmDialog from 'ui-component/common/ConfirmDialog';

const DeleteConfirmationDialog = ({
    open,
    handleClose,
    details,
    deleteItem
}: {
    open: boolean;
    handleClose: VoidFunction;
    details: any;
    deleteItem: (ItemDetails: any) => void;
}) => {
    function handleSubmitClick() {
        deleteItem(details);
        handleClose();
    }
    return (
        <ConfirmDialog open={open} onClose={handleClose} title={'Delete'} onActionBtnClick={handleSubmitClick}>
            <Box>
                Are you sure you want to Delete <strong>"{details?.name}"</strong>?
            </Box>
        </ConfirmDialog>
    );
};

export default DeleteConfirmationDialog;
