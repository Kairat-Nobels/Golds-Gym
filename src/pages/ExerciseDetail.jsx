import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import { translateExercise, translateExercises } from '../utils/translateExercise';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          exerciseOptions,
        );

        const translatedExerciseDetail = await translateExercise(exerciseDetailData);
        setExerciseDetail(translatedExerciseDetail);

        const exerciseVideosData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
          youtubeOptions,
        );
        setExerciseVideos(exerciseVideosData?.contents || []);

        const targetMuscleExercisesData = await fetchData(
          `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
          exerciseOptions,
        );
        const translatedTargetExercises = await translateExercises(targetMuscleExercisesData);
        setTargetMuscleExercises(translatedTargetExercises);

        const equipmentExercisesData = await fetchData(
          `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
          exerciseOptions,
        );
        const translatedEquipmentExercises = await translateExercises(equipmentExercisesData);
        setEquipmentExercises(translatedEquipmentExercises);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при загрузке упражнения:', error);
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>Загрузка...</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetail;
