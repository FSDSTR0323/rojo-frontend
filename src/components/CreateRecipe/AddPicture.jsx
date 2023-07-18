import { Box, Container, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageUploader from '../Images/ImageUploader';
import '../../App.css';
const AddPicture = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ color: '#1c5a1c' }}>
        <h3>Picture upload</h3>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          className="recipeImage"
          sx={{
            width: '200px',
            height: '200px',
            backgroundColor: '#1c5a1c',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddAPhotoIcon sx={{ color: 'white' }} />
        </Box>
        {/* <ImageUploader /> */}
      </Box>
    </Container>
  );
};

export default AddPicture;
