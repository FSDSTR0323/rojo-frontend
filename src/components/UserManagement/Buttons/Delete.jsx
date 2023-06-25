import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';

const DeleteConfirmation = ({ open, onCancel, onConfirm }) => {
  const cancelDeleteHandler = () => {
    onCancel();
  };

  const confirmDeleteHandler = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={cancelDeleteHandler}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>
          You are going to delete this user, are you sure?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDeleteHandler}>Cancelar</Button>
        <Button onClick={confirmDeleteHandler} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;




