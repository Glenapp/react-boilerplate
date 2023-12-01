import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

// Props interface for ProjectDelete component
interface ProjectDeleteProps {
    show: boolean;
    handleDelete: () => void;
    handleClose: () => void;
}
const ProjectDelete: React.FC<ProjectDeleteProps> = ({ show, handleDelete, handleClose }) => {
    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this project ?'}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="inherit">
                    No
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProjectDelete;
