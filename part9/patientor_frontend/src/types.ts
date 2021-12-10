export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other"
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries: Entry[];
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

type SickLeave = { 
	startDate: string;
	endDate: string;
};

type Discharge = {
	date: string;
	criteria: string;
};

export type Entry = 
	| HealthCheckEntry
	| OccupationalHealthCareEntry
	| HospitalEntry;

export type NewEntry = 
	| Omit<HealthCheckEntry, "id"> 
	| Omit<OccupationalHealthCareEntry, "id"> 
	| Omit<HospitalEntry, "id">;

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum TypeOfEntry {
	Hospital = "Hospital",
	OccupationalHealthcare = "OccupationalHealthcare",
	Healthcheck = "HealthCheck"
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export type BaseFormEntry = Omit<BaseEntry, "id">;
export interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital",
	discharge: Discharge;
}

export type EntryFormValues = {
	type: TypeOfEntry;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
	healthCheckRating: number;
	employerName: string;
	sickLeaveStartDate: string;
	sickLeaveEndDate: string;
	dischargeDate: string;
	dischargeText: string;
};