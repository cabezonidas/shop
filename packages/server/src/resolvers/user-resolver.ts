import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity/user";
import { hash } from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => String)
  public hello() {
    return "hi!";
  }

  @Mutation(() => Boolean)
  public async register(@Arg("email") email: string, @Arg("password") password: string) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({ email, password: hashedPassword });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
