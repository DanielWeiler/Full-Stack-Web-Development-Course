import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching all patients!');
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  console.log("Fetching one patient's data!");
	res.send(patientService.getPatient(req.params.id));
});

router.post('/', (_req, res) => {
  console.log('Saving a patient!');
  try {
    const newPatientEntry = toNewPatientEntry(_req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  console.log('Saving a patient entry!');
	const patient = patientService.getPatient(req.params.id);
	if (patient) {
		try {
			const newEntry = toNewEntry(req.body);
			const updatedPatient = patientService.addNewEntry(patient, newEntry);
			res.json(updatedPatient);
		} catch (e: any) {
			res.status(400).send(e.message);
		}
	} else {
		res.status(404).send({ e: "Patient doesn't exist" });
	}
});

export default router;