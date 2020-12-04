import { injectable } from 'inversify';
import { PlantRecord } from '../models/plantRecord';

export abstract class IPlantService {

  abstract markPlantWatered(userId: string, plantName: string): Promise<void>;

  abstract getPlant(userId: string, plantName: string): Promise<PlantRecord>;

}