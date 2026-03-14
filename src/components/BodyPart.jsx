import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';

import { bodyPartTranslations } from '../utils/translations';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const translated = bodyPartTranslations[item] || item;

  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={
        bodyPart === item
          ? {
            borderTop: '4px solid #FF2625',
            background: '#fff',
            borderBottomLeftRadius: '20px',
            width: '270px',
            height: '282px',
            cursor: 'pointer',
            gap: '47px',
          }
          : {
            background: '#fff',
            borderBottomLeftRadius: '20px',
            width: '270px',
            height: '282px',
            cursor: 'pointer',
            gap: '47px',
          }
      }
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      }}
    >
      <img src={Icon} alt="gym icon" style={{ width: '40px', height: '40px' }} />

      <Typography
        fontSize="24px"
        fontWeight="bold"
        fontFamily="Alegreya"
        color="#3A1212"
        textTransform="capitalize"
      >
        {translated}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
