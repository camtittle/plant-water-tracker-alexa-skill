## Plant Water Tracker Alexa Skill

A simple Alexa skill to track when I last watered each house plant.

> "Alexa, tell Plant Water Tracker I've just watered the cheese plant"
> "Alexa, ask Plant Tracker when I last watered the bonsai tree"

## Development

Built in Typescript using the ASK SDK and InversifyJS for dependency injection.


## Build and Deploy

* Setup AWS credentials. 
* Create a deployment S3 bucket in AWS. 
* Populate config in scripts/deployConfig.ts. 
* `npm run buildAndDeploy`