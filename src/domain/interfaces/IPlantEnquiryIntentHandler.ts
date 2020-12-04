import {
  HandlerInput,
  RequestHandler,
} from 'ask-sdk-core';

import {
  Response,
} from 'ask-sdk-model';

export abstract class IPlantEnquiryIntentHandler implements RequestHandler {

  abstract canHandle(handlerInput: HandlerInput): boolean;

  abstract handle(handlerInput: HandlerInput): Promise<Response>;

}