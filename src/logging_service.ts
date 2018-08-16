import {ILoggingRepository, ILoggingService, LogEntry, LogLevel} from '@process-engine/logging_api_contracts';

import {IIAMService, IIdentity} from '@essential-projects/iam_contracts';

export class LoggingService implements ILoggingService {

  private _iamService: IIAMService;
  private _loggingRepository: ILoggingRepository;

  constructor(iamService: IIAMService, loggingRepository: ILoggingRepository) {
    this._iamService = iamService;
    this._loggingRepository = loggingRepository;
  }

  private get iamService(): IIAMService {
    return this._iamService;
  }

  private get loggingRepository(): ILoggingRepository {
    return this._loggingRepository;
  }

  // TODO: Add claim checks as soon as necessary claims have been defined.
  public async getLogsForCorrelation(identity: IIdentity, correlationId: string, logLevel?: LogLevel): Promise<Array<LogEntry>> {
    return this.loggingRepository.getLogsForCorrelation(correlationId, logLevel);
  }

  // TODO: Add claim checks as soon as necessary claims have been defined.
  public async getLogsForProcessInstance(identity: IIdentity,
                                         correlationId: string,
                                         processModelId: string,
                                         logLevel?: LogLevel): Promise<Array<LogEntry>> {
    return this.loggingRepository.getLogsForProcessInstance(correlationId, processModelId, logLevel);
  }

  public async writeLogForProcessModel(correlationId: string, processModelId: string, logLevel: LogLevel, message: string): Promise<void> {
    await this.loggingRepository.writeLogForProcessModel(correlationId, processModelId, logLevel, message);
  }

  public async writeLogForFlowNodeInstance(correlationId: string,
                                           processModelId: string,
                                           flowNodeInstanceId: string,
                                           logLevel: LogLevel,
                                           message: string): Promise<void> {
    await this.loggingRepository.writeLogForFlowNodeInstance(correlationId, processModelId, flowNodeInstanceId, logLevel, message);
  }
}
