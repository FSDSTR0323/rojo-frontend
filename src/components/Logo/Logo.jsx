import React from 'react';
import logo from '../../assets/Logo.png';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logo} style={{ width: '100px' }} alt="Food Informer Logo" />
    </div>
  );
};

export default Logo;
