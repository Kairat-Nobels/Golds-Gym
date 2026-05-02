import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

import {
  bodyPartTranslations,
  targetTranslations,
  equipmentTranslations,
} from '../utils/translations';

import { addWorkoutPlan } from '../api/workoutApi';

const Detail = ({ exerciseDetail }) => {
  const navigate = useNavigate();

  const {
    id,
    bodyPart,
    gifUrl,
    name,
    target,
    equipment,
  } = exerciseDetail;

  const bodyPartRu = bodyPartTranslations[bodyPart] || bodyPart;
  const targetRu = targetTranslations[target] || target;
  const equipmentRu = equipmentTranslations[equipment] || equipment;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPartRu,
    },
    {
      icon: TargetImage,
      name: targetRu,
    },
    {
      icon: EquipmentImage,
      name: equipmentRu,
    },
  ];

  const handleAddToPlan = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
      return;
    }

    const newPlanItem = {
      userId: user.id,
      exerciseId: id,
      name,
      gifUrl,
      bodyPart: bodyPartRu,
      target: targetRu,
      equipment: equipmentRu,
      sets: 3,
      reps: 12,
      day: 'Понедельник',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    await addWorkoutPlan(newPlanItem);
    alert('Упражнение добавлено в план');
    navigate('/my-plan');
  };

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />

      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
          {name}
        </Typography>

        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
          Упражнения помогают оставаться сильным.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> — одно из
          лучших упражнений для тренировки мышц: <b>{targetRu}</b>. <br />
          Оно помогает улучшить настроение и зарядиться энергией.
        </Typography>

        <Button
          variant="contained"
          sx={{
            background: '#FF2625',
            color: '#fff',
            width: '220px',
            height: '50px',
            fontSize: '16px',
            textTransform: 'none',
            '&:hover': {
              background: '#d91f1f',
            },
          }}
          onClick={handleAddToPlan}
        >
          Добавить в план
        </Button>

        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px' }} />
            </Button>

            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
