import { 
	NewPatient, 
    NewPatientFields,
	NewEntryData,
	Gender, 
	Diagnosis, 
	Discharge, 
	HealthCheckRating, 
	SickLeave 
} from './types';


// Type guards 
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
    return ssn.length === 11 ? true : false;
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isNumber = (healthCheckRating: unknown): healthCheckRating is number => {
	return typeof healthCheckRating === 'number';
};

const isInHealthCheckRating = (healthCheckRating: number): boolean => {
	return Object.values(HealthCheckRating).includes(healthCheckRating);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const isObjectNotNull = (discharge: unknown): discharge is object => {
	if (typeof discharge === 'object' && discharge !== null) {
		return true;
	}
	return false;
};


// Field parsing
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect date or missing: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect SSN or missing');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect gender or missing: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description: ' + description);
	}
	return description;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date: ' + date);
	}
	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist: ' + specialist);
	}
	return specialist;
};

const parseDiagnosisCode = (diagnosisCode: string[] | undefined): Array<Diagnosis["code"]> | undefined => {
	// 
	if (diagnosisCode) {
		if (!Array.isArray(diagnosisCode)) {
			throw new Error('Diagnosis code exists, but it is not an array: ' + diagnosisCode);
		}
		if (diagnosisCode.every((diagnosisCode) => typeof diagnosisCode === 'string')) {
			return diagnosisCode;
		} else {
			throw new Error('All fields in diagnosisCode are not strings: ' + diagnosisCode);
		}
	} else {
		return diagnosisCode;
	}
};

const parseCriteria = (criteria: unknown): string => {
	if (!criteria || !isString(criteria)) {
		throw new Error('Incorrect or missing criteria: ' + criteria);
	}
	return criteria;
};

const parseDischarge = (discharge: Discharge): Discharge => {
	if (!discharge || !isObjectNotNull(discharge) || Object.keys(discharge).length !== 2) {
		throw new Error ('Discharge is invalid or cannot be found: ' + discharge);
	}

	if (!discharge.date) {
		throw new Error ('Discharge date is invalid or cannot be found: ' + discharge);
	}

	if (!discharge.criteria) {
		throw new Error ('Discharge criteria is invalid or cannot be found: ' + discharge);
	}

	return {
		date: parseDate(discharge.date),
		criteria: parseCriteria(discharge.criteria)
	};
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
	if (!healthCheckRating || !isNumber(healthCheckRating) || !isInHealthCheckRating(healthCheckRating)) {
		throw new Error('Invalid healthCheckRating or cannot be found: ' + healthCheckRating);
	}
	return healthCheckRating;
}; 

const parseEmployerName = (employerName: unknown): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Invalid or missing employerName: ' + employerName);
	}
	return employerName;
};

const parseSickLeave = (sickLeave: SickLeave): SickLeave => {
	if (!sickLeave || !isObjectNotNull(sickLeave)) {
		throw new Error ('Invalid or missing sick leave field: ' + sickLeave);
	}

	if (!sickLeave.startDate) {
		throw new Error ('Invalid or missing start date: ' + sickLeave);
	}

	if (!sickLeave.endDate) {
		throw new Error ('Invalid or missing end date: ' + sickLeave);
	}

	return {
		startDate: parseDate(sickLeave.startDate),
		endDate: parseDate(sickLeave.endDate)
	};
};

const parseEntry = (entry: unknown): NewEntryData => {
	if (!entry || !isObjectNotNull(entry) || !parseEntryTypeName(entry as NewEntryData)) {
		throw new Error('Invalid entry or entry type: ' + entry);
	}
	return entry as NewEntryData;
};

const parseEntryTypeName = (entry: NewEntryData): boolean => {
	if (entry.type === 'HealthCheck') {
		return true;
	} else if (entry.type === 'Hospital') { 
		return true;
	} else if (entry.type === 'OccupationalHealthcare') {
		return true;
	} else {
		return false;
	}
};


export const toNewPatientEntry = ({name, ssn, dateOfBirth, gender, occupation}: NewPatientFields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newEntry;
};

export const toNewEntry = (entryFields: NewEntryData): NewEntryData => {
	const validEntry = parseEntry(entryFields);
	
	if (!validEntry) {
		throw new Error('Invalid entry');
	}

	validEntry.description = parseDescription(validEntry.description);
	validEntry.date = parseDate(validEntry.date);
	validEntry.specialist = parseSpecialist(validEntry.specialist);
	validEntry.diagnosisCodes = parseDiagnosisCode(validEntry.diagnosisCodes);

	switch(validEntry.type) {
		case "Hospital":
			validEntry.discharge = parseDischarge(validEntry.discharge);
			return validEntry;
		case "HealthCheck":
			validEntry.healthCheckRating = parseHealthCheckRating(validEntry.healthCheckRating);
			return validEntry;
		case "OccupationalHealthcare": {
			validEntry.employerName = parseEmployerName(validEntry.employerName);
			if (validEntry.sickLeave) {
				validEntry.sickLeave = parseSickLeave(validEntry.sickLeave);
			}
			return validEntry;
		}
		default:
			return assertNever(validEntry);
	}
};

const assertNever = (value: never): never => {
	throw new Error(
		`Invalid entry type: ${value}`
	);
};