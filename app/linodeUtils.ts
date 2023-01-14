import type {
  GetObjectCommandOutput,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY || "",
  },
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  forcePathStyle: false,
  endpoint:
    "https://" +
    process.env.LINODE_OBJECT_STORAGE_REGION +
    ".linodeobjects.com",
});

export async function uploadFileToObjectStorage(
  data: AsyncIterable<Uint8Array>,
  fileName: string,
  contentType: string
) {
  const params: PutObjectCommandInput = {
    Bucket: process.env.LINODE_OBJECT_BUCKET || "",
    Key: fileName,
    Body: await convertToBuffer(data),
    ContentType: contentType,
    ACL: "public-read",
  };

  await s3Client.send(new PutObjectCommand(params));

  let response: GetObjectCommandOutput = await s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.LINODE_OBJECT_BUCKET,
      Key: fileName,
    })
  );

  let url = "";
  if (response.Body) {
    url =
      "https://" +
      (response.Body as any)["req"]["host"] +
      (response.Body as any)["req"]["path"]; // todo: this is a hack, but I can't figure out how to get the url from the response
  }

  return url;
}

async function convertToBuffer(a: AsyncIterable<Uint8Array>) {
  const result = [];
  for await (const chunk of a) {
    result.push(chunk);
  }
  return Buffer.concat(result);
}
