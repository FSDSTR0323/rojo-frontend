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
      <DialogTitle>Eliminar usuario</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro de querer eliminar el usuario?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelDeleteHandler}>Cancelar</Button>
        <Button onClick={confirmDeleteHandler} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;




