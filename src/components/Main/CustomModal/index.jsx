import { Modal, Box } from '@mui/material';

const CustomModal = ({ children, open, onClose }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.8' } },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
