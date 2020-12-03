import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { format } from "date-fns";
import { injectable } from "inversify";
import { DynamoDbTables } from "../domain/consts/dynamoDbTables";
import { IPlantRepository } from "../domain/interfaces/IPlantRepository";
import { PlantRecord } from "../domain/models/plantRecord";
import { PlantRecordDbItem } from "../domain/models/plantRecordDbItem";

@injectable()
export class PlantRepository implements IPlantRepository {

  private sortKeyPrefix = 'PLANT#';

  constructor(private dynamoDbClient: DocumentClient) {
  }

  async putPlantRecord(record: PlantRecord): Promise<void> {
    const dbItem = this.mapPlantRecordToDbItem(record);

    const params: DocumentClient.PutItemInput = {
      TableName: DynamoDbTables.PlantsTable,
      Item: dbItem
    };

    await this.dynamoDbClient.put(params).promise();
  }

  private mapPlantRecordToDbItem(record: PlantRecord): PlantRecordDbItem {
    return {
      userId: record.userId,
      sortKey: this.sortKeyPrefix + record.name,
      name: record.name,
      lastWateredDate: format(record.lastWateredDate, 'yyyy-MM-dd')
    };
  }
  
}