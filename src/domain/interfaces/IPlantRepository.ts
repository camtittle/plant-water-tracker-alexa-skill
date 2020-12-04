import { PlantRecord } from "../models/plantRecord";

export abstract class IPlantRepository {
  abstract putPlantRecord(record: PlantRecord): Promise<void>;
  abstract getPlantRecord(userId: string, plantName: string): Promise<PlantRecord>;
}