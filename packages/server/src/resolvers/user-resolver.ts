import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/user";

@Resolver()
export class UserResolver {
  @Query(() => String)
  public hello() {
    return "hi!";
  }

  @Mutation()
  public async register(@Arg("email") email: string, @Arg("password") password: string) {
    return await User.insert({ email, password });
  }
}
