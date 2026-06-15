// import winston, { format } from 'winston';

// const { combine, json, timestamp } = format;

// export const logger = winston.createLogger({
//     level: 'info',
//     format: combine(timestamp(), json()),
//     // defaultMeta: { service: 'user-service' },
//     transports: [
//         new winston.transports.File({ filename: 'error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'combined.log' })
//     ]
// });

// export const buildLogger = (service: string) => {
//     return {
//         log: (message: string) => {
//             logger.log('info', { message, service });
//         },
//         error: (message: string) => {
//             logger.log('error', {
//                 message,
//                 service
//             });
//         }
//     }
// }

/*
const winston = require('winston');

const { combine, json, timestamp } = winston.format;

const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    // defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

exports.buildLogger = (service) => {
    return {
        log: (message) => {
            logger.log('info', { message, service });
        },
        error: (message) => {
            logger.log('error', {
                message,
                service
            });
        }
    }
}
*/