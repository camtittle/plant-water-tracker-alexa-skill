import {
  HandlerInput,
} from 'ask-sdk-core';
import {
  Response,
  IntentRequest,
} from 'ask-sdk-model';
import { injectable } from 'inversify';
import { Intents } from '../../domain/consts/intents';
import { Slots } from '../../domain/consts/slots';
import { IPlantService } from '../../domain/interfaces/IPlantService';
import { IPlantWateredIntentHandler } from '../../domain/interfaces/IPlantWateredIntentHandler';

@injectable()
export class PlantWateredIntentHandler implements IPlantWateredIntentHandler {

  private plantNameKey = '{plantName}';
  private plantWateredResponseSpeech = `Okay, you\'ve watered ${this.plantNameKey}.`;

  constructor(private plantService: IPlantService) {
  }

  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === Intents.PlantWateredIntent;
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    
    const userId = handlerInput.requestEnvelope.session?.user.userId;
    const request = handlerInput.requestEnvelope.request as IntentRequest;
    const plantName = request.intent.slots[Slots.PlantName].value;

    console.log(`Watering plant ${plantName} for userId ${userId}`);

    await this.plantService.markPlantWatered(userId, plantName);

    const responseSpeech = this.plantWateredResponseSpeech.replace(this.plantNameKey, plantName);

    return handlerInput.responseBuilder
      .speak(responseSpeech)
      .getResponse();
  }

};