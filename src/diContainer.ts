import 'reflect-metadata';
import { IPlantWateredIntentHandler } from "./domain/interfaces/IPlantWateredIntentHandler";
import { PlantRepository } from "./database/PlantRepository";
import { IPlantRepository } from "./domain/interfaces/IPlantRepository";
import { RequestHandler } from "ask-sdk";
import { PlantTrackerEventHandler } from "./lambda/plantTrackerFunction/plantTrackerEventHandler";
import { Container, decorate, injectable } from "inversify";
import { PlantService } from "./business/services/PlantService";
import { PlantWateredIntentHandler } from "./business/intentHandlers/plantWateredIntentHandler";
import { IPlantService } from "./domain/interfaces/IPlantService";
import { ILambdaEventHandler } from "./domain/interfaces/ILambdaEventHandler";
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { IPlantEnquiryIntentHandler } from './domain/interfaces/IPlantEnquiryIntentHandler';
import { PlantEnquiryIntentHandler } from './business/intentHandlers/plantEnquiryIntentHandler';


export const diContainer = new Container();

// Services
diContainer.bind<IPlantService>(IPlantService).to(PlantService).inSingletonScope();

// Alexa Intent Request handler
diContainer.bind<RequestHandler>(IPlantWateredIntentHandler).to(PlantWateredIntentHandler).inSingletonScope();
diContainer.bind<RequestHandler>(IPlantEnquiryIntentHandler).to(PlantEnquiryIntentHandler).inSingletonScope();

// Lambda function handlers
diContainer.bind<ILambdaEventHandler<RequestEnvelope, any, ResponseEnvelope>>(ILambdaEventHandler).to(PlantTrackerEventHandler).inSingletonScope();

// Repositories
diContainer.bind<IPlantRepository>(IPlantRepository).to(PlantRepository).inSingletonScope();

// 3rd Party
decorate(injectable(), DocumentClient);
diContainer.bind<DocumentClient>(DocumentClient).toConstantValue(new DocumentClient());