/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type UserInDB = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role?: UserRole;
    pole: string;
    nature: string;
    contract_type: string;
    is_contractor?: boolean;
    contractor_company?: (string | null);
    id: number;
    is_active: boolean;
};

