import { useState } from 'react';
import { Alert, Button } from '@mui/material';
import cloudinary from 'cloudinary';

const ImageRemover = ({ imageUrl, onRemoveImage }) => {
  const [error, setError] = useState(null);

  const handleRemoveImage = async () => {
    try {
      const publicId = imageUrl.split('/').pop()?.split('.').shift();
    
      const result = await cloudinary.uploader.destroy(publicId);
    
      if (result.result === 'ok') {
        console.log('Image removed from Cloudinary');
        onRemoveImage();
      } else {
        console.log('Error removing image from Cloudinary');
      }
    } catch (error) {
      console.log('Error removing image:', error);
      setError('Error removing image');
    }
  };

  return (
    <div>
      {imageUrl && (
        <div>
          <Button
            onClick={handleRemoveImage}
            variant="outlined"
            sx={{ mt: 2, mb: 1.5 }}
          >
            Remove Image
          </Button>          
          {error && (
            <Alert
              severity="error"
              sx={{ mt: 1 }}
            >
              {error}
            </Alert>
          )}
        </div>
      )}

      {error && (
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ mt: 2 }}
        >
          {error}
        </Alert>
      )}
    </div>
  );
};

export default ImageRemover;
