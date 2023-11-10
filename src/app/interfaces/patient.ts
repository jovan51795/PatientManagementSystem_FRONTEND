import { IDoctor } from './docker';

export interface IPatient {
    id?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    birthday?: string;
    place_of_birth?: string;
    gender?: string;
    contact?: string;
    emergency_contact?: string;
    active?: boolean;
    status?: string;
    patientRecords: IPatientRecord[];
}

export interface IPatientRecord {
    id?: number;
    file?: any;
    prescriptions?: string;
    notes?: string;
    diagnose?: string;
    physician?: IDoctor;
}
