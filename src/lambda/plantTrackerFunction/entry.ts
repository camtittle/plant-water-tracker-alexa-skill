import { diContainer } from "../../diContainer";
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { ILambdaEventHandler } from "../../domain/interfaces/ILambdaEventHandler";

export const handler = async (event: RequestEnvelope, context: any): Promise<ResponseEnvelope> => {

  const plantTrackerHandler = diContainer.get<ILambdaEventHandler<RequestEnvelope, any, ResponseEnvelope>>(ILambdaEventHandler);

  return plantTrackerHandler.handler(event, context);

};