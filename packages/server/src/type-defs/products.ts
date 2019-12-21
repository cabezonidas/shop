import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type Query {
    products: String
  }
  input CreateProductInput {
    title: String
    description: String
  }
  type Mutation {
    createProduct(product: CreateProductInput): Boolean
  }
`;

export default productTypeDefs;
