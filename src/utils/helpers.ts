import { Request } from "express";

export const getIP = (req: Request) => {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const formattedDateNow = (location: string = 'es-AR') => {
    return new Date().toLocaleString(location, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    
} 