import { injectable } from "inversify";
import { IPlantRepository } from "./../../domain/interfaces/IPlantRepository";
import { IPlantService } from "../../domain/interfaces/IPlantService";
import { PlantRecord } from "../../domain/models/plantRecord";

@injectable()
export class PlantService implements IPlantService {

  constructor(private plantRepository: IPlantRepository) { }

  public async markPlantWatered(userId: string, plantName: string): Promise<void> {
    const record: PlantRecord = {
      userId: userId,
      name: plantName,
      lastWateredDate: new Date()
    };

    await this.plantRepository.putPlantRecord(record);
  }

}