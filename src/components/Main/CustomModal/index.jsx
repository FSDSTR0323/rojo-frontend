import { Modal, Box } from '@mui/material';

const CustomModal = ({ children, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none', // Agregar outline: 'none' para evitar el contorno en el cuadro del Modal
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;

