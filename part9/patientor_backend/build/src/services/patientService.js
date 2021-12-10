"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Already typed in the data file
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatient = (id) => {
    const singlePatientData = patients_1.default.find(patient => patient.id === id);
    return singlePatientData;
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatientEntry = Object.assign(Object.assign({ id }, entry), { entries: [] });
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addNewEntry = (patient, entryData) => {
    const newEntry = Object.assign(Object.assign({}, entryData), { id: (0, uuid_1.v1)() });
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    getPatient,
    addPatient,
    addNewEntry
};
