import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATEUSER } from '../config/routes';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import CustomModal from '../components/Main/CustomModal';
import { CreateUserForm } from '../components/singUp/CreateUserForm';

export const UserAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState (false) 
  const toggleAddUserModalHandler = () => {setIsModalOpen (!isModalOpen)}
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ mx: 3, mb: 4, textAlign: 'left' }}>
        Panel de gestión de usuarios
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button
          //component={Link}
          //to={CREATEUSER}
          onClick={toggleAddUserModalHandler}
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: '#52c41a',
            color: 'black',
            textTransform: 'none',
            mr: 2,
            ml: 5,
          }}
        >
          Añadir Usuario
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#52c41a',
            color: 'black',
            textTransform: 'none',
            mr: 2,
          }}
        >
          Filtrar
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <TextField
            placeholder="Buscar"
            variant="outlined"
            size="small"
            sx={{ 
              borderRadius: '20px',
              mr: 5, 
              width: '500px' }}
            InputProps={{
              endAdornment: (
                <Search sx={{ color: 'grey.500', cursor: 'pointer' }} />
              ),
            }}
          />
        </Box>
      </Box>
    </Box>

    {isModalOpen && (<CustomModal open={isModalOpen} onClose={toggleAddUserModalHandler}><CreateUserForm/></CustomModal>)}
    </>
  );
};

//TODO: fer funcional el botó filtrar i el buscador
//TODO: insertar <table/> d'usuaris

