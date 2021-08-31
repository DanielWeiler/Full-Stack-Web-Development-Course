type Args = {
  target: number
  period: number[]
};

const parseArgs = (args: string[]): Args => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  const period: number[] = [];
  for (let index = 3; index < args.length; index++) {
    const element = Number(args[index]);
    if (isNaN(element)) {
      throw new Error('Provided values were not numbers!');
    }
    period.push(element);
  }

  if (!isNaN(Number(args[2]))) {
    return {
      target: Number(args[2]),
      period: period
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type Result = {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
};

export const calculateExercises = (
  period: number[],
  dailyTarget: number
): Result => {
  // Calculate number of training days
  let trainingDays = 0;
  const calculateTrainingDays = (value: number) => {
    if (value !== 0) {
      trainingDays += 1;
    }
  };
  period.forEach(calculateTrainingDays);

  // Calculate if the average daily target of training hours was met
  let totalHours = 0;
  const calculateTrainingHrs = (value: number) => {
    totalHours += value;
  };
  period.forEach(calculateTrainingHrs);
  let trainingAvg = 0;
  trainingAvg = totalHours / period.length;
  let success;
  trainingAvg >= dailyTarget ? (success = true) : (success = false);

  // Calculate the rating of the training period
  let rating = 0;
  let ratingDescription = '';
  if (trainingAvg >= dailyTarget) {
    rating = 3;
    ratingDescription = 'You met your goal! Keep it up!';
  } else if (trainingAvg < dailyTarget * 0.75) {
    rating = 1;
    ratingDescription = 'You exercised less than 75% of your goal.';
  } else {
    rating = 2;
    ratingDescription =
      'You almost met your goal. You exercised at least 75% of your goal.';
  }

  return {
    periodLength: period.length,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: trainingAvg,
  };
};

try {
  const { target, period } = parseArgs(process.argv);
  console.log(calculateExercises(period, target));
} catch (error) {
  // eslint-disable-next-line
  console.log('Error, something bad happened, message: ', error.message);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
