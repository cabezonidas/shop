import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import {
  awsListAlbums,
  awsCreateAlbum,
  awsAddPhoto,
  awsViewAlbum,
  awsDeleteAlbum,
  awsDeletePhoto,
} from "../integrations";
import { Stream } from "stream";
import { GraphQLUpload } from "apollo-server-express";

// tslint:disable-next-line: interface-over-type-literal
type FileUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
};

@ObjectType()
class AwsPhoto {
  @Field()
  public photoKey: string;
  @Field()
  public photoUrl: string;
  @Field()
  public name: string;
}

@Resolver()
export class MediaResolver {
  @Query(() => [String])
  public async getAlbums() {
    return await awsListAlbums();
  }

  @Query(() => [AwsPhoto])
  public async viewAlbum(
    @Arg("albumName", () => String)
    albumName: string
  ) {
    const result = await awsViewAlbum(albumName);
    if (result.succeed) {
      return result.photos;
    } else {
      throw new Error(result.error);
    }
  }

  @Mutation(() => String)
  public async createAlbum(@Arg("albumName") albumName: string): Promise<string> {
    const result = await awsCreateAlbum(albumName);
    if (result.succeed) {
      return result.albumKey;
    } else {
      throw new Error(result.error);
    }
  }

  @Mutation(() => AwsPhoto)
  public async addPicture(
    @Arg("picture", () => GraphQLUpload)
    { filename, createReadStream }: FileUpload,
    @Arg("albumName", () => String)
    albumName: string
  ): Promise<AwsPhoto> {
    const stream = createReadStream();
    const upload = await awsAddPhoto(albumName, filename, stream);
    return upload;
  }

  @Mutation(() => Boolean)
  public async deleteAlbum(
    @Arg("albumName", () => String)
    albumName: string
  ): Promise<boolean> {
    const deleted = await awsDeleteAlbum(albumName);
    if (deleted.succeed) {
      return true;
    } else {
      throw new Error(deleted.error);
    }
  }

  @Mutation(() => Boolean)
  public async deletePicture(
    @Arg("photoKey", () => String)
    photoKey: string
  ): Promise<boolean> {
    const deleted = await awsDeletePhoto(photoKey);
    if (deleted.succeed) {
      return true;
    } else {
      throw new Error(deleted.error);
    }
  }
}
