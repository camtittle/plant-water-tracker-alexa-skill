import { PlantRecord } from "../models/plantRecord";
import { injectable } from 'inversify';

@injectable()
export abstract class IPlantRepository {
  abstract putPlantRecord(record: PlantRecord): Promise<void>;
}