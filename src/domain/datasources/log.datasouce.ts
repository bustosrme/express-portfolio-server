import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract save (log: LogEntity): Promise<void>;
    abstract get (severityLevel: LogSeverityLevel): Promise<LogEntity[]>;

}