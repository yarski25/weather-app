import { S3 } from "aws-sdk";

const AWS_API_VERSION = process.env.REACT_APP_AWS_API_VERSION as string;
const AWS_S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET as string;
const AWS_REGION = process.env.REACT_APP_AWS_REGION as string;

class S3Singleton {
  static instance: any = undefined;

  static async getInstance() {
    if (S3Singleton.instance) {
      return S3Singleton.instance;
    }
    S3Singleton.instance = await S3Singleton.createInstance();

    return S3Singleton.instance;
  }
  static createInstance = async () => {
    return new S3({
      apiVersion: AWS_API_VERSION,
      region: AWS_REGION,
      params: { Bucket: AWS_S3_BUCKET },
    });
  };
}
export default S3Singleton;
