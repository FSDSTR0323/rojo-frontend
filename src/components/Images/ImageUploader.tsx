import React, { useState, useEffect } from 'react';
import { CloudUpload, CheckCircle } from '@mui/icons-material';
import Avatar from './avatar';

type ImageUploaderProps = {
  onImageSelect: (image: File) => void;
};

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState('Upload Image');

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setCroppedImage(null);
      setIsUploadComplete(false);
    }
  };

  const handleCropImage = (croppedImage: string) => {
    setCroppedImage(croppedImage);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      setUploadProgress(0);
      setError(null);
      setIsUploading(true);
      setButtonText('Uploading...');

      try {
        await onImageSelect(selectedImage);
        simulateUploadProgress();
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

  const simulateUploadProgress = async () => {
    try {
      for (let progress = 0; progress <= 100; progress++) {
        await delay(50);
        setUploadProgress(progress);
      }

      const randomError = Math.random() < 0.3; // Simulate an error randomly.
      setIsUploadComplete(true);
      setIsUploading(false);

      if (randomError) {
        console.log('Error uploading image');
        setError('Error uploading image');
        setUploadProgress(0);
        setButtonText('Upload Image');
      } else {
        await delay(5000);
        setIsUploadComplete(true);
        setButtonText('Successful upload!');
      }
    } catch (error) {
      console.log('Error uploading image:', error);
      setError('Error uploading image');
      setUploadProgress(0);
      setIsUploadComplete(false);
      setButtonText('Upload Image');
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div>
      {!croppedImage && !isUploadComplete && (
        <>
          <Avatar image={selectedImage} onCropImage={handleCropImage}/> 
          <input type="file" accept="image/*" onChange={handleImageSelect} /> 
        </>
      )}     
    
      {croppedImage && <img src={croppedImage} alt="Cropped Image" />}
    
      {uploadProgress > 0 && uploadProgress < 100 && <><progress max="100" value={uploadProgress}/><span> {uploadProgress} % </span></>}
      {error && <p>Error: {error}</p>}
  
      <button onClick={handleUpload} disabled={!selectedImage || isUploading}>
        {isUploading ? (
          'Uploading...'
        ) : isUploadComplete ? (
          <>
            <CheckCircle sx={{ mr: 1 }} />
            Successful upload!
          </>
        ) : (
          <>
            <CloudUpload />
            {buttonText}
          </>
        )}
      </button>
    </div>
  );
}  

export default ImageUploader;
