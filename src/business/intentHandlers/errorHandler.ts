import { ErrorHandler, HandlerInput } from "ask-sdk";
import { Response } from 'ask-sdk-model';

export const ErrorHandlerImpl : ErrorHandler = {
  canHandle(handlerInput : HandlerInput, error : Error ) : boolean {
    return true;
  },

  handle(handlerInput : HandlerInput, error : Error) : Response {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please try again.')
      .reprompt('Sorry, I can\'t understand the command. Please try again.')
      .getResponse();
  },
};