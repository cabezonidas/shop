import { createProductSchema } from "@cabezonidas/shop-common";

export const productResolvers = {
  Mutation: {
    createProduct: async (_: any, { product }: any) => {
      try {
        await createProductSchema.validate(product);
      } catch (err) {
        console.log(err);
        return false;
      }

      return true;
    },
  },
};

export default productResolvers;
