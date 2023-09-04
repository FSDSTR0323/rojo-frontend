import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Button, Slider } from '@mui/material'

const Avatar = ({ image, onCropImage }) => {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const [scale, setScale] = useState(1)
  const [borderRadius, setBorderRadius] = useState(0)
  const editorRef = useRef(null)

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition)
  }

  const handleScaleChange = (event, newScale) => {
    setScale(newScale)
  }

  const handleBorderRadiusChange = (event, newBorderRadius) => {
    setBorderRadius(newBorderRadius)
  }

  const handleCropClick = () => {
    const editor = editorRef.current
    if (editor) {
      const canvas = editor.getImageScaledToCanvas()
      if (canvas) {
        const croppedImage = canvas.toDataURL('image/jpeg', 0.8)
        onCropImage(croppedImage || image)
      }
    }
  }

  return (
    <div>
      {image && (
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={200}
          height={200}
          border={50}
          color={[255, 255, 255, 0.6]}
          borderRadius={borderRadius}
          scale={scale}
          rotate={0}
          position={position}
          onPositionChange={handlePositionChange}
          style={{ marginBottom: '20px', borderRadius: '50%' }}
        />
      )}
      <div>
        <label htmlFor="zoom">Zoom:</label>
        <Slider
          color="success"
          size="md"
          valueLabelDisplay="off"
          variant="solid"
          value={scale}
          min={1}
          max={2}
          step={0.1}
          onChange={handleScaleChange}
        />
      </div>
      <div>
        <label htmlFor="border-radius">Border Radius:</label>
        <Slider
          color="success"
          size="md"
          valueLabelDisplay="off"
          variant="solid"
          value={borderRadius}
          min={0}
          max={100}
          step={1}
          onChange={handleBorderRadiusChange}
        />
      </div>
      <Button
        fullWidth
        onClick={handleCropClick}
        sx={{
          mt: 1.5,
          mb: 3,
          backgroundColor: '#277c27fb',
          '&:hover': { backgroundColor: '#277c27cf' }
        }}
        variant="contained"
      >
        Crop Image
      </Button>
    </div>
  )
}

export default Avatar
