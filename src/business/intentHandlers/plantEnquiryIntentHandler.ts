import {
  HandlerInput,
} from 'ask-sdk-core';
import {
  Response,
  IntentRequest,
} from 'ask-sdk-model';
import { differenceInDays, isYesterday } from 'date-fns';
import { isToday } from 'date-fns/esm';
import { injectable } from 'inversify';
import { Intents } from '../../domain/consts/intents';
import { Slots } from '../../domain/consts/slots';
import { IPlantEnquiryIntentHandler } from '../../domain/interfaces/IPlantEnquiryIntentHandler';
import { IPlantService } from '../../domain/interfaces/IPlantService';
import { PlantRecord } from '../../domain/models/plantRecord';

@injectable()
export class PlantEnquiryIntentHandler implements IPlantEnquiryIntentHandler {

  private plantNameKey = '{plantName}';
  private dateTimePhraseKey = '{dateTimeKey}';
  private plantWateredResponseSpeech = `You watered ${this.plantNameKey} ${this.dateTimePhraseKey}.`;
  private plantNotFoundResponseSpeech = `Sorry, I couldn't find a plant called ${this.plantNameKey}.`;

  constructor(private plantService: IPlantService) {
  }

  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === Intents.PlantEnquiryIntent;
  }

  private getPlantNotFoundSpeech(plantName: string): string {
    return this.plantNotFoundResponseSpeech
      .replace(this.plantNameKey, plantName);
  }

  private getPlantLastWateredSpeech(plantRecord: PlantRecord): string {
    return this.plantWateredResponseSpeech
      .replace(this.plantNameKey, plantRecord.name)
      .replace(this.dateTimePhraseKey, this.getDateTimePhrase(plantRecord.lastWateredDate));
  }

  private getDateTimePhrase(date: Date): string {
    const today = new Date();
    if (isToday(date)) {
      return 'today';
    } else if (isYesterday(date)) {
      return 'yesterday';
    } else {
      const diff = differenceInDays(today, date);
      return diff + ' days ago';
    }
  }

  async handle(handlerInput: HandlerInput): Promise<Response> {
    
    const userId = handlerInput.requestEnvelope.session?.user.userId;
    const request = handlerInput.requestEnvelope.request as IntentRequest;
    const plantName = request.intent.slots[Slots.PlantName].value;

    console.log(`Enquiring about '${plantName}' for userId ${userId}`);

    let responseSpeech = '';
    const plant = await this.plantService.getPlant(userId, plantName);
    if (!plant) {
      console.log(`Plant '${plantName}' not found for userId ${userId}`);
      responseSpeech = this.getPlantNotFoundSpeech(plantName);
    } else {
      responseSpeech = this.getPlantLastWateredSpeech(plant);
    }

    return handlerInput.responseBuilder
      .speak(responseSpeech)
      .getResponse();
  }



};