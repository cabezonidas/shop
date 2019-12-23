import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { User } from "../entity/user";
import { hash, compare } from "bcryptjs";

@ObjectType()
class LoginResponse {
  @Field()
  public accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  public hello() {
    return "hi!";
  }

  @Query(() => [User])
  public async users() {
    return await User.find();
  }

  @Mutation(() => LoginResponse)
  public async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("invalid login");
    }

    const valid = compare(password, user.password);
    if (valid) {
      throw new Error("invalid password");
    }

    return {
      accessToken: "",
    };
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
