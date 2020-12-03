import { deployConfig } from "./deployConfig";
import { runCmd } from './runCommand';

const stackName = 'plant-tracker-alexa-skill';
const profile = deployConfig.awsProfile;
const region = deployConfig.awsRegion;

const deploySam = async () => {

  const command = 'sam';
  const params = [
    `deploy`,
    `-t`, `./cloudformation/template.yaml`,
    `--stack-name`, stackName,
    `--s3-bucket`, deployConfig.deploymentBucket,
    `--s3-prefix`, stackName,
    `--profile`, profile,
    `--region`, region,
    `--capabilities`, 'CAPABILITY_IAM',
    `--no-fail-on-empty-changeset`,
    `--parameter-overrides`,
    `AlexaSkillId=${deployConfig.skillId}`
  ];

  await runCmd(command, params, true);

};

(async () => {
  try {

    console.log('Deploying SAM')
    await deploySam();
    
    console.log('Done');

  } catch (error) {
    console.log(`The following error was thrown during deployment \n`, error);
    process.exitCode = 1;
  }

})();