"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    console.log("Fetching one patient's data!");
    res.send(patientService_1.default.getPatient(req.params.id));
});
router.post('/', (_req, res) => {
    console.log('Saving a patient!');
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(_req.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    console.log('Saving a patient entry!');
    const patient = patientService_1.default.getPatient(req.params.id);
    if (patient) {
        try {
            const newEntry = (0, utils_1.toNewEntry)(req.body);
            const updatedPatient = patientService_1.default.addNewEntry(patient, newEntry);
            res.json(updatedPatient);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
    else {
        res.status(404).send({ e: "Patient doesn't exist" });
    }
});
exports.default = router;
