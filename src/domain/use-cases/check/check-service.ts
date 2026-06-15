import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckService implements CheckService {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) { }

    public async execute(url: string): Promise<boolean> {
        let log;
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            log = new LogEntity({
                message:`Service ${url} working`, 
                level:LogSeverityLevel.low,
                origin:'check-service.ts',
            });
            this.logRepository.save(log);
            this.successCallback && this.successCallback()
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            log = new LogEntity({
                message:errorMessage, 
                level: LogSeverityLevel.low,
                origin:'check-service.ts',
            })
            this.logRepository.save(log)
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
        finally{
            
        }
    }
}