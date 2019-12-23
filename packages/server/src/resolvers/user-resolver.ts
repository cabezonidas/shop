import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { User } from "../entity/user";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IGraphqlContext } from "../igraphql-context";

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

    const refresToken = sign({ userId: user.id }, process.env.REFRESH_KEY, { expiresIn: "7d" });
    res.cookie("jid", refresToken, { httpOnly: true });

    return {
      accessToken: sign({ userId: user.id }, process.env.ACCESS_KEY, { expiresIn: "15m" }),
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
