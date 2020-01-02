import { config, S3 } from "aws-sdk";

const albumBucketName = "cabezonidas-shop-photos";
const bucketRegion = "us-east-1";

config.update({
  region: bucketRegion,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName },
});

export const awsCreateAlbum = (albumName: string): Promise<{ succeed: boolean; error?: string }> =>
  new Promise(resolve => {
    albumName = albumName.trim();
    if (!albumName) {
      return resolve({
        succeed: false,
        error: "Album names must contain at least one non-space character.",
      });
    }
    if (albumName.indexOf("/") !== -1) {
      return resolve({
        succeed: false,
        error: "Album names cannot contain slashes.",
      });
    }
    const albumKey = encodeURIComponent(albumName) + "/";
    s3.headObject({ Key: albumKey } as any, (err1, data1) => {
      if (!err1) {
        return resolve({
          succeed: false,
          error: "Album already exists.",
        });
      }
      if (err1.code !== "NotFound") {
        return resolve({
          succeed: false,
          error: "There was an error creating your album: " + err1.message,
        });
      }
      s3.putObject({ Key: albumKey } as any, (err2, data) => {
        if (err2) {
          return resolve({
            succeed: false,
            error: "There was an error creating your album: " + err2.message,
          });
        }
        return resolve({ succeed: true });
      });
    });
  });

export const awsListAlbums = async (): Promise<string[]> =>
  new Promise(resolve => {
    s3.listObjects({ Delimiter: "/" } as any, (err, data) => {
      if (err) {
        throw new Error("There was an error listing your albums: " + err.message);
      } else {
        const albums = data.CommonPrefixes.map(commonPrefix => {
          const prefix = commonPrefix.Prefix;
          return decodeURIComponent(prefix.replace("/", ""));
        });
        console.log(albums);
        resolve(albums);
      }
    });
  });
