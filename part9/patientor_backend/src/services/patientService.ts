// Already typed in the data file
import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntryData, Entry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
  return patientData;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
	const singlePatientData = patientData.find(patient => patient.id === id);
	return singlePatientData;
};

const addPatient = ( entry: NewPatient ): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
    entries: []
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const addNewEntry = (patient: Patient, entryData: NewEntryData): Patient => {
	const newEntry: Entry = {
		...entryData,
		id: uuid()
	};

	patient.entries.push(newEntry);

	return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addNewEntry
};