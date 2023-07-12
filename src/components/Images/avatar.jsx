import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

const Avatar = ({ image, onCropImage }) => { 
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [scale, setScale] = useState(1);
  const [borderRadius, setBorderRadius] = useState(0);
  const editorRef = useRef(null);

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  const handleScaleChange = (newScale) => {
    setScale(newScale);
  };

  const handleBorderRadiusChange = (event) => {
    const newBorderRadius = parseInt(event.target.value);
    setBorderRadius(newBorderRadius);
  };

  const handleCropClick = () => {
    const editor = editorRef.current;
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      if (canvas) {
        const croppedImage = canvas.toDataURL('image/jpeg', 0.8);
        onCropImage(croppedImage || image);
      }
    }
  };

  return (
    <div>
      {image && (
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]}
          borderRadius={borderRadius}
          scale={scale}
          rotate={0}
          position={position}
          onPositionChange={handlePositionChange}
          style={{ marginBottom: '20px' }}
        />
      )}
      <div>
        <label htmlFor="zoom">Zoom:</label>
        <input
          type="range"
          id="zoom"
          min="1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(event) => handleScaleChange(parseFloat(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="border-radius">Border Radius:</label>
        <input
          type="range"
          id="border-radius"
          min="0"
          max="100"
          step="1"
          value={borderRadius}
          onChange={handleBorderRadiusChange}
        />
      </div>
      <button onClick={handleCropClick}>Crop Image</button>
    </div>
  );
};

export default Avatar;