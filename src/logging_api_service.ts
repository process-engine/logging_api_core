import {ILoggingApi, ILoggingRepository, LogEntry, LogLevel} from '@process-engine/logging_api_contracts';

import {IIAMService, IIdentity} from '@essential-projects/iam_contracts';

export class LoggingApiService implements ILoggingApi {

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
  public async readLogForCorrelation(identity: IIdentity, correlationId: string): Promise<Array<LogEntry>> {
    return this.loggingRepository.readLogForCorrelation(correlationId);
  }

  // TODO: Add claim checks as soon as necessary claims have been defined.
  public async readLogForProcessModel(identity: IIdentity, correlationId: string, processModelId: string): Promise<Array<LogEntry>> {
    return this.loggingRepository.readLogForProcessModel(correlationId, processModelId);
  }

  public async writeLogForProcessModel(correlationId: string,
                                       processModelId: string,
                                       logLevel: LogLevel,
                                       message: string,
                                       timestamp: Date): Promise<void> {
    await this.loggingRepository.writeLogForProcessModel(correlationId, processModelId, logLevel, message, timestamp);
  }

  public async writeLogForFlowNode(correlationId: string,
                                   processModelId: string,
                                   flowNodeInstanceId: string,
                                   flowNodeId: string,
                                   logLevel: LogLevel,
                                   message: string,
                                   timestamp: Date): Promise<void> {
    await this.loggingRepository.writeLogForFlowNode(correlationId, processModelId, flowNodeInstanceId, flowNodeId, logLevel, message, timestamp);
  }
}
