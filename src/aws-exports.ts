import { config } from "aws-sdk";

const AWS_REGION = process.env.REACT_APP_AWS_REGION as string;
const AWS_AKI = process.env.REACT_APP_AWS_KEY as string;
const AWS_ASK = process.env.REACT_APP_AWS_SECRET_KEY as string;

const AWSConfig = {
  accessKeyId: AWS_AKI,
  secretAccessKey: AWS_ASK,
  region: AWS_REGION,
};

config.update(AWSConfig);

// export default config;
