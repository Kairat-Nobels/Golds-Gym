import {
  bodyPartTranslations,
  targetTranslations,
  equipmentTranslations,
  difficultyTranslations,
  exerciseNameTranslations,
  categoryTranslations,
  secondaryMuscleTranslations,
} from './translations';

const translateText = async (text) => {
  if (!text) return text;

  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t&q=${encodeURIComponent(text)}`,
    );

    const data = await res.json();
    return data[0]?.map((item) => item[0]).join('') || text;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка перевода текста:', error);
    return text;
  }
};

export const translateExercise = async (exercise) => {
  if (!exercise) return exercise;

  const translatedDescription = await translateText(exercise.description);

  const translatedInstructions = await Promise.all(
    (exercise.instructions || []).map((instruction) => translateText(instruction)),
  );

  return {
    ...exercise,
    name: exerciseNameTranslations[exercise.name] || (await translateText(exercise.name)),
    bodyPart: bodyPartTranslations[exercise.bodyPart] || exercise.bodyPart,
    target: targetTranslations[exercise.target] || exercise.target,
    equipment: equipmentTranslations[exercise.equipment] || exercise.equipment,
    difficulty: difficultyTranslations[exercise.difficulty] || exercise.difficulty,
    category: categoryTranslations[exercise.category] || exercise.category,
    secondaryMuscles:
      exercise.secondaryMuscles?.map(
        (muscle) => secondaryMuscleTranslations[muscle] || muscle,
      ) || [],
    description: translatedDescription,
    instructions: translatedInstructions,
  };
};

export const translateExercises = async (exercises = []) => Promise.all(exercises.map((exercise) => translateExercise(exercise)));
