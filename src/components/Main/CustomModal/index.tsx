import { Modal, Box } from '@mui/material'

interface ModalProps {
  children: React.ReactNode
  open: boolean
  onClose: (value: React.SetStateAction<boolean>) => void
}

export const CustomModal = ({ children, open, onClose }: ModalProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.8' } }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '50vw',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4
          }}
        >
          {children}
        </Box>
      </Modal>
    </>
  )
}
