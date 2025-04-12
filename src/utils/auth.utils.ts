import { JwtPayload } from '@/types/auth.types';
import { jwtDecode } from 'jwt-decode';


export const validateToken = (token: string | null): boolean => {
    if (!token) return false;
    
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const expiration = decoded.exp * 1000;
        return expiration > Date.now();
    } catch {
        return false;
    }
};