import React, { useState, useEffect } from 'react';
import { CloudUpload, CheckCircle } from '@mui/icons-material';
import { Button, LinearProgress, Typography, Box } from '@mui/material';
import Avatar from './avatar';
import { useHaccp } from '../../hooks/useHaccp';

const ImageUploader = ({ onImageSelect, imageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState('Upload Image');
  const { setPicture } = useHaccp();

  useEffect(() => {
    if (isUploading) {
      setButtonText(`Uploading... ${uploadProgress}%`);
    } else if (isUploadComplete) {
      setButtonText('Successful upload!');
    } else {
      setButtonText('Upload Image');
    }
  }, [isUploading, isUploadComplete, uploadProgress]);

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setCroppedImage(null);
      setIsUploadComplete(false);
      const imageUrl = URL.createObjectURL(file);
    }
  };

  const handleCropImage = (croppedImage) => {
    onImageSelect(croppedImage || selectedImage);
    setCroppedImage(croppedImage);
  };

  const simulateUploadProgress = () => {
    if (uploadProgress < 100) {
      const increment = Math.floor(Math.random() * 5) + 1;
      setUploadProgress((prevProgress) =>
        Math.min(prevProgress + increment, 100)
      );
      setTimeout(simulateUploadProgress, 50);
    } else {
      const randomError = Math.random() < 0.3;
      if (randomError) {
        setError('Error uploading image');
        setUploadProgress(0);
      } else {
        setIsUploadComplete(true);
        setButtonText('Successful upload!');
      }
      setIsUploading(false);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setUploadProgress(0);
      setError(null);
      setIsUploadComplete(false);
      simulateUploadProgress();
      setIsUploading(true);
      setButtonText('Uploading...');

      try {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append(
          'upload_preset',
          import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME
          }/upload`,
          {
            method: 'POST',
            body: formData,
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.secure_url;
          simulateUploadProgress(true);
          onImageSelect(croppedImage);
        } else {
          throw new Error('Error uploading image');
        }
      } catch (error) {
        setError('Error uploading image');
        setUploadProgress(0);
        setIsUploadComplete(false);
        setButtonText('Upload Image');
      } finally {
        setIsUploading(false);
        setIsUploadComplete(true);
        setButtonText('Successful upload!');
      }
    }
  };

  return (
    <div>
      {!croppedImage && !isUploadComplete && (
        <>
          <div>
            {selectedImage && (
              <Avatar
                image={selectedImage}
                onCropImage={handleCropImage}
                sx={{ borderRadius: '50%' }}
              />
            )}

            <Button
              fullWidth
              sx={{
                mt: 1.5,
                mb: 3,
                backgroundColor: '#277c27fb',
                '&:hover': { backgroundColor: '#277c27cf' },
              }}
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

      {croppedImage && (
        <Box
          sx={{
            borderRadius: '50%',
            width: '200px',
            height: '200px',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          <img src={croppedImage} alt="Cropped Image" />
        </Box>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <>
          <LinearProgress
            max={100}
            variant="determinate"
            value={uploadProgress}
            sx={{
              backgroundColor: '#b7b7b7',
              '& .MuiLinearProgress-bar': { backgroundColor: '#277c27' },
              mt: 2,
            }}
          />
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            {uploadProgress} %
          </Typography>
        </>
      )}
      {error && <p>Error: {error}</p>}

      {imageUrl && <img src={imageUrl} alt="Selected Image" />}

      <Button
        fullWidth
        onClick={handleUpload}
        sx={{
          mt: 1.5,
          mb: 3,
          backgroundColor: '#277c27fb',
          '&:hover': { backgroundColor: '#277c27cf' },
        }}
        variant="contained"
        disabled={!selectedImage || isUploading}
      >
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
