import { injectable } from 'inversify';

@injectable()
export abstract class ILambdaEventHandler<EventType, ContextType, ResponseType> {

  abstract handler(event: EventType, context: ContextType): Promise<ResponseType>;

}