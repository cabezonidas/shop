import { config, S3 } from "aws-sdk";
import { Stream } from "stream";

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

export const awsCreateAlbum = (
  albumName: string
): Promise<{ succeed: boolean; error?: string; albumKey: string }> =>
  new Promise(resolve => {
    albumName = albumName.trim();
    if (!albumName) {
      return resolve({
        succeed: false,
        error: "Album names must contain at least one non-space character.",
        albumKey: "",
      });
    }
    if (albumName.indexOf("/") !== -1) {
      return resolve({
        succeed: false,
        error: "Album names cannot contain slashes.",
        albumKey: "",
      });
    }
    const albumKey = encodeURIComponent(albumName) + "/";
    s3.headObject({ Key: albumKey } as any, (err1, _) => {
      if (!err1) {
        return resolve({
          succeed: false,
          error: "Album already exists.",
          albumKey: "",
        });
      }
      if (err1.code !== "NotFound") {
        return resolve({
          succeed: false,
          error: "There was an error creating your album: " + err1.message,
          albumKey: "",
        });
      }
      s3.putObject({ Key: albumKey } as any, (err2, __) => {
        if (err2) {
          return resolve({
            succeed: false,
            error: "There was an error creating your album: " + err2.message,
            albumKey: "",
          });
        }
        return resolve({ succeed: true, albumKey: albumName });
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
        resolve(albums);
      }
    });
  });

export const awsAddPhoto = async (albumName: string, fileName: string, file: Stream) => {
  const albumPhotosKey = encodeURIComponent(albumName) + "//";

  const photoKey = albumPhotosKey + fileName;

  const upload = new S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
      ACL: "public-read",
    },
  });

  const result = await upload.promise();
  return {
    photoKey: result.Key,
    name: fileName,
    photoUrl: result.Location,
  };
};

export const awsViewAlbum = async (
  albumName: string
): Promise<{
  succeed: boolean;
  error?: string;
  photos: Array<{ photoKey: string; photoUrl: string; name: string }>;
}> =>
  new Promise(resolve => {
    {
      const albumPhotosKey = encodeURIComponent(albumName) + "//";
      s3.listObjects({ Prefix: albumPhotosKey } as any, (err, data) => {
        if (err) {
          return resolve({
            succeed: false,
            error: "There was an error viewing your album: " + err.message,
            photos: [],
          });
        }
        const bucketUrl = `https://${albumBucketName}.s3.amazonaws.com/`;

        const photos = data.Contents.map(photo => ({
          photoKey: photo.Key,
          photoUrl: bucketUrl + encodeURIComponent(photo.Key),
          name: photo.Key.replace(albumPhotosKey, ""),
        }));
        return resolve({ succeed: true, photos });
      });
    }
  });

export const awsDeletePhoto = async (
  photoKey: string
): Promise<{ succeed: boolean; error?: string }> =>
  new Promise(resolve => {
    {
      s3.deleteObject({ Key: photoKey } as any, (err, _) => {
        if (err) {
          return resolve({
            succeed: false,
            error: `There was an error deleting your photo: ${err.message}`,
          });
        }
        return resolve({ succeed: true });
      });
    }
  });

export const awsDeleteAlbum = async (
  albumName: string
): Promise<{ succeed: boolean; error?: string }> =>
  new Promise(resolve => {
    const albumKey = encodeURIComponent(albumName) + "/";
    s3.listObjects({ Prefix: albumKey } as any, (err, data) => {
      if (err) {
        return resolve({
          succeed: false,
          error: `There was an error deleting your album: ${err.message}`,
        });
      }
      const objects = data.Contents.map(object => {
        return { Key: object.Key };
      });
      s3.deleteObjects(
        {
          Delete: { Objects: objects, Quiet: true },
        } as any,
        (err2, _) => {
          if (err2) {
            return resolve({
              succeed: false,
              error: `There was an error deleting your album: ${err.message}`,
            });
          }
          return resolve({ succeed: true });
        }
      );
    });
  });
