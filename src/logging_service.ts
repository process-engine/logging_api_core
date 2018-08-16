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
                                         processModelId: string,
                                         correlationId: string,
                                         logLevel?: LogLevel): Promise<Array<LogEntry>> {
    return this.loggingRepository.getLogsForProcessInstance(processModelId, correlationId, logLevel);
  }

  public async writeLogForProcessModel(processModelId: string, correlationId: string, logLevel: LogLevel, message: string): Promise<void> {
    await this.loggingRepository.writeLogForProcessModel(processModelId, correlationId, logLevel, message);
  }

  public async writeLogForFlowNodeInstance(processModelId: string,
                                           correlationId: string,
                                           flowNodeInstanceId: string,
                                           logLevel: LogLevel,
                                           message: string): Promise<void> {
    await this.loggingRepository.writeLogForFlowNodeInstance(processModelId, correlationId, flowNodeInstanceId, logLevel, message);
  }
}
