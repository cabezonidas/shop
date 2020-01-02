import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { awsListAlbums, awsCreateAlbum } from "../integrations";

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
}
