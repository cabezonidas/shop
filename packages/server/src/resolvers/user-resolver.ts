import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entity/user";
import { hash, compare } from "bcryptjs";
import { IGraphqlContext } from "../igraphql-context";
import { createRefreshToken, createAccessToken, sendRefreshToken } from "../auth/tokens";
import { isAuth } from "../auth/is-auth";

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

  @Query(() => String)
  @UseMiddleware(isAuth)
  public bye(@Ctx() { payload }: IGraphqlContext) {
    return `Bye user ${payload.userId}`;
  }

  @Query(() => [User])
  public async users() {
    return await User.find();
  }

  @Mutation(() => LoginResponse)
  public async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: IGraphqlContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("invalid login");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("invalid password");
    }

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
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
