import { injectable } from 'inversify';

@injectable()
export abstract class IPlantService {

  abstract markPlantWatered(userId: string, plantName: string): Promise<void>;

}