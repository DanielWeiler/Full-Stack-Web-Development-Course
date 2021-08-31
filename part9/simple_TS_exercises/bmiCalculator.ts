type Arguments = {
  height: number;
  weight: number;
};

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// Height in cm
// Weight in kg
export const calculateBmi = (h: number, w: number) => {
  const bmiIndex = w / ((h * h) / 10000);
  let bmiMsg = '';

  if (bmiIndex < 18.6) {
    bmiMsg = 'Underweight';
  }
  else if (bmiIndex >= 18.6 && bmiIndex < 24.9) {
    bmiMsg = 'Normal (healthy weight)';
  }
  else {
    bmiMsg = 'Overweight';
  }

  //console.log(bmiMsg);
  return {bmiMsg, bmiIndex};
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  // eslint-disable-next-line
  console.log('Error, something bad happened, message: ', error.message);
}

//console.log(calculateBmi(180, 74));
