import { SkillBuilders } from "ask-sdk";
import { IPlantWateredIntentHandler } from "./../../domain/interfaces/IPlantWateredIntentHandler";
import { CustomSkill } from "ask-sdk-core/dist/skill/CustomSkill";
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { inject, injectable } from "inversify";
import { ILambdaEventHandler } from "../../domain/interfaces/ILambdaEventHandler";
import { ErrorHandlerImpl } from "../../business/intentHandlers/errorHandler";

let skill: CustomSkill;

@injectable()
export class PlantTrackerEventHandler implements ILambdaEventHandler<RequestEnvelope, any, ResponseEnvelope> {

  constructor(private plantWateredIntentHandler: IPlantWateredIntentHandler) { 
  }

  async handler(event: RequestEnvelope, context: any): Promise<ResponseEnvelope> {

    console.log(`REQUEST++++${JSON.stringify(event)}`);
  
    if (!skill) {
      skill = SkillBuilders.custom()
        .addRequestHandlers(
          this.plantWateredIntentHandler,
        )
        .addErrorHandlers(ErrorHandlerImpl)
        .create();
    }
  
    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);
  
    return response;

  }

}