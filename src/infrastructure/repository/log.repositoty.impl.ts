import { LogDataSource } from "../../domain/datasources/log.datasouce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(private readonly logDatasource: LogDataSource) {
        
    }

    async save(log: LogEntity): Promise<void> {
        this.logDatasource.save(log);
    }
    async get(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.get(severityLevel);
    }

}