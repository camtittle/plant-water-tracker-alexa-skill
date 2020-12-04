import { injectable } from 'inversify';

export abstract class ILambdaEventHandler<EventType, ContextType, ResponseType> {

  abstract handler(event: EventType, context: ContextType): Promise<ResponseType>;

}