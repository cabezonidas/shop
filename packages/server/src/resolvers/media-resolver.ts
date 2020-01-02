import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { awsListAlbums, awsCreateAlbum } from "../integrations";
import { Stream } from "stream";
import { createWriteStream, WriteStream, writeFileSync } from "fs";
import { GraphQLUpload } from "apollo-server-express";

// tslint:disable-next-line: interface-over-type-literal
type FileUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
};

@Resolver()
export class MediaResolver {
  @Query(() => [String])
  public async getAlbums() {
    return await awsListAlbums();
  }

  @Mutation(() => Boolean)
  public async createAlbum(@Arg("albumName") albumName: string): Promise<boolean> {
    const result = await awsCreateAlbum(albumName);
    if (result.succeed) {
      return true;
    } else {
      throw new Error(result.error);
    }
  }

  @Mutation(() => Boolean)
  public async addPicture(
    @Arg("picture", () => GraphQLUpload)
    image: FileUpload
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const { filename, createReadStream } = image;
      createReadStream()
        .pipe(createWriteStream(`/Users/Personal/shop/packages/server/src/resolvers/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false));
    });
  }
}
