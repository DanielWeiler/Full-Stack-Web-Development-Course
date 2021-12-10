import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching all diagnoses!');
  res.send(diagnosisService.getDiagnoses());
});

/* router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
}); */

export default router;