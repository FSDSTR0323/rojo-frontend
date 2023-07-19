import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';

export const CardRecipe = ({ haccp, isValidationMode, handleChangeData }) => {
  const [isAccepted, setIsAccepted] = useState();
  const handleChange = (e) => {
    setIsAccepted(e.target.value === 'true');
    handleChangeData(e);
  };
  useEffect(() => {}, [isAccepted]);

  return (
    <Container
      sx={{
        mb: 2,
        pt: 2,
        pb: 2,
        backgroundColor: '#CCC',
        borderRadius: '5px',
      }}
    >
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Haccp name</b>
        </Typography>
        <hr />
        <Typography>{haccp?.name}</Typography>
      </Box>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Ingredients status</b>
        </Typography>
        <hr />
        {haccp?.ingredientsStatus.map((item, index) => (
          <Typography key={index}>
            <li>{item}</li>
          </Typography>
        ))}
      </Box>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Control</b>
        </Typography>
        <hr />
        {haccp?.control.map((item, index) => (
          <Typography key={index}>
            <li>{item}</li>
          </Typography>
        ))}
      </Box>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Procedure</b>
        </Typography>
        <hr />
        <Typography>{haccp?.procedure}</Typography>
      </Box>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Frecuency</b>
        </Typography>
        <hr />
        {haccp?.frequency.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </Box>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Hazzard</b>
        </Typography>
        <hr />
        <Typography>{haccp?.hazzard}</Typography>
      </Box>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography>
          <b>Limits</b>
        </Typography>
        <hr />
        {haccp?.limits.map((item, index) => (
          <Typography key={index}>
            <li>{item}</li>
          </Typography>
        ))}
      </Box>
      {isValidationMode && (
        <FormControl>
          <RadioGroup
            name={'valid_' + haccp._id}
            sx={{ mb: 2 }}
            onChange={handleChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Accept" />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Refuse"
            />
          </RadioGroup>
          {isAccepted === false && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ mb: 3, width: '100%' }}>
                <Typography>
                  <b>Corrective Actions</b>
                </Typography>
                <hr />
                <RadioGroup
                  name={'correctiveActions_' + haccp._id}
                  onChange={handleChangeData}
                  sx={{ width: '100%' }}
                >
                  {haccp?.correctiveActions.map((ca, index) => (
                    <FormControlLabel
                      key={index}
                      sx={{ width: '100%' }}
                      value={ca}
                      control={<Radio />}
                      label={ca}
                    />
                  ))}
                </RadioGroup>
              </Box>
              <Typography>
                <b>Comment</b>
              </Typography>
              <TextField
                name={'comment_' + haccp._id}
                onChange={handleChangeData}
                sx={{
                  backgroundColor: '#FFF',
                  borderRadius: '5px',
                  width: '100%',
                }}
              />
            </Box>
          )}
        </FormControl>
      )}
    </Container>
  );
};
