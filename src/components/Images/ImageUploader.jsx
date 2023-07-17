import React, { useState } from 'react';
import { CloudUpload, CheckCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import Avatar from './avatar';

const ImageUploader = ({ onImageSelect, imageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Upload Image');

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setCroppedImage(null);
      setIsUploadComplete(false);      
      console.log('Selected Image:', file);
      const imageUrl = URL.createObjectURL(file);
      console.log('Image URL:', imageUrl);
    }
  };

  const handleCropImage = (croppedImage) => {
    onImageSelect(croppedImage || selectedImage);
    console.log('Cropped Image:', croppedImage);
    setCroppedImage(croppedImage);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setUploadProgress(0);
      setError(null);
      setIsUploading(true);
      setButtonText('Uploading...');

      try {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`, {
          method: 'POST',
          body: formData,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          console.log('Uploaded Image URL:', imageUrl);
          onImageSelect(croppedImage);
          setIsUploadComplete(true);
          setButtonText('Successful upload!');
        } else {
          throw new Error('Error uploading image');          
        }
        console.log('Uploaded Image URL:', croppedImage);
      } catch (error) {
        console.log('Error uploading image:', error);
        setError('Error uploading image');
        setUploadProgress(0);
        setIsUploadComplete(false);
        setButtonText('Upload Image');
      } finally {
        setIsUploading(false);
      }
    }
  };

  console.log('Selected Image:', selectedImage);
  console.log('Cropped Image:', croppedImage);
  console.log('Upload Progress:', uploadProgress);
  console.log('Is Uploading:', isUploading);
  console.log('Is Upload Complete:', isUploadComplete);
  console.log('Error:', error);
  console.log('Button Text:', buttonText);

  return (
    <div>
      {!croppedImage && !isUploadComplete && (
        <>
          <div>
            {selectedImage && (
              <Avatar image={selectedImage} onCropImage={handleCropImage} />
            )}
            
            <Button
              fullWidth
              sx={{ mt: 1.5, mb: 3, backgroundColor:"#277c27fb", "&:hover": {backgroundColor: "#277c27cf"}, }}
              variant="contained"
              component="label"
            >
              Select Image
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageSelect}
              />
            </Button>
          </div>

        </>
      )}

      {croppedImage && <img src={croppedImage} alt="Cropped Image" />}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <>
          <progress max="100" value={uploadProgress} />
          <span> {uploadProgress} % </span>
        </>
      )}
      {error && <p>Error: {error}</p>}

      {imageUrl && <img src={imageUrl} alt="Selected Image" />}

      <Button fullWidth onClick={handleUpload} sx={{ mt: 1.5, mb: 3, backgroundColor:"#277c27fb", "&:hover": {backgroundColor: "#277c27cf"}, }} variant="contained"disabled={!selectedImage || isUploading}>
        {isUploading ? (
          'Uploading...'
        ) : isUploadComplete ? (
          <>
            <CheckCircle sx={{ marginRight: '8px' }} />
            Successful upload!
          </>
        ) : (
          <>
            <CloudUpload sx={{ marginRight: '8px' }} />
            {buttonText}
          </>
        )}
      </Button>
    </div>
  );
};

export default ImageUploader;