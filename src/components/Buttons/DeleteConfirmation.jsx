import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';

const DeleteConfirmation = ({ open, onCancel, onConfirm, userToDelete, filteredUsers }) => {
  const cancelDeleteHandler = () => {
    onCancel();
  };

  return (
    <Dialog open={open} onClose={cancelDeleteHandler}>
      <DialogTitle>Eliminar usuario</DialogTitle>
      <DialogContent>
        <Typography>¿Estás seguro de querer eliminar el usuario {userToDelete.firstName} {userToDelete.lastName}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDeleteHandler}> Cancelar </Button>
        <Button onClick={() => onConfirm(userToDelete, filteredUsers)} autoFocus> Confirmar </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;

