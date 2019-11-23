import { Request, Response } from "express";
import Product from "../schema/product";

export const allProducts = async (_: Request, res: Response) => {
  Product.find((err, products) => {
    if (err) {
      res.send(err);
    } else {
      res.send(products);
    }
  });
};

export const getProduct = (req: Request, res: Response) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.send(product);
    }
  });
};

export const addProduct = (req: Request, res: Response) => {
  new Product(req.body).save((err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.send(product);
    }
  });
};
