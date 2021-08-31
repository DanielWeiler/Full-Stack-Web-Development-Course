import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());
/* const router = express.Router();
app.use('/', router); */

type exercisesInput = {
  target: number
  period: number[]
};

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const request = req.query;
  if (!request.height || !request.weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi: string = calculateBmi(height, weight).bmiMsg;
  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  const { target, period } = req.body as exercisesInput;

  if (!target || !period) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    isNaN(target) ||
    !Array.isArray(period) ||
    !period.every((n) => typeof n === 'number')
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(period, target);
  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
