import S3Singleton from "../s3";

const AWS_S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET as string;

export const fetchImage = async (imageKey: string) => {
  let image: any;
  try {
    const s3 = await S3Singleton.getInstance();
    s3.getObject(
      {
        Bucket: AWS_S3_BUCKET,
        Key: imageKey,
      },
      (err: Error, data: any) => {
        if (err) return;

        if (data) {
          // to get image in base64 format
          image = `data:image/png;base64, ${data.Body.toString("base64")}`;
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};
