import { createProductSchema } from "@cabezonidas/shop-common";
import { Product } from "../schema";

export const productResolvers = {
  Mutation: {
    createProduct: async (_: any, { product }: any) => {
      try {
        await createProductSchema.validate(product);
        return await new Product({ ...product, createdAt: new Date() }).save();
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
  Query: {
    products: async () => await Product.find(),
  },
};

export default productResolvers;
