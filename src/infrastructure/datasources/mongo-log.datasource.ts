import { LogModel } from "../../data/mongo/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasouce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource {

    async save(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
    }
    async get(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel })
        return logs.map(LogEntity.fromObject);
    }

}