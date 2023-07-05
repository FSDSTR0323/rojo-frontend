import React, { useState } from 'react';
import { CloudUpload, CheckCircle } from '@mui/icons-material';


type ImageUploaderProps = {
  onImageSelect: (image: File) => void;
};

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const [buttonText, setButtonText] = useState('Upload Image');

  const handleUpload = () => {
    if (selectedImage) {
      // Reset previous state
      setUploadProgress(0);
      setIsUploadComplete(false);
      setError(null);

      // Simulate upload progress
      simulateUploadProgress();

      // Call the callback function with the selected image
      onImageSelect(selectedImage);
    }
  };

  const simulateUploadProgress = () => {
    if (uploadProgress <= 100) {
      const increment = Math.floor(Math.random() * 5) + 1;
      setUploadProgress((prevProgress) => Math.min(prevProgress + increment, 100));
      setTimeout(simulateUploadProgress, 40);
    } else {
      const randomError = Math.random() < 0.3; // Simulate an error randomly.
      if (randomError) {
        setError('Error uploading image');
        setUploadProgress(0);
      } else {
        setIsUploadComplete(true);
        setButtonText('Successful upload!');
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      {selectedImage && (
        <img 
          src={URL.createObjectURL(selectedImage)} 
          alt="Preview"
          style={{ maxWidth: '50%', height: 'auto' }} 
        />
      )}
      {!isUploadComplete && (
        <button onClick={handleUpload} disabled={!selectedImage}>
          <CloudUpload /> 
          {isUploadComplete ? <CheckCircle sx={{ mr: 1 }} /> : null}
              {buttonText}
        </button>
      )}
      
      {uploadProgress > 0 && uploadProgress < 100 && <p>Upload Progress: {uploadProgress}%</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ImageUploader;
