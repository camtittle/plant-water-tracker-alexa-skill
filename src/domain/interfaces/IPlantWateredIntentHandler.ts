import {
  HandlerInput,
  RequestHandler,
} from 'ask-sdk-core';

import {
  Response,
} from 'ask-sdk-model';
import { injectable } from 'inversify';

// @injectable()
export abstract class IPlantWateredIntentHandler implements RequestHandler {

  abstract canHandle(handlerInput: HandlerInput): boolean;

  abstract handle(handlerInput: HandlerInput): Promise<Response>;

}