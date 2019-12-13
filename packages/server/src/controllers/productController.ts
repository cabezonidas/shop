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

export const deleteProduct = (req: Request, res: Response) => {
  Product.findById(req.body.id, (err, product) => {
    if (err) {
      res.send(err);
    } else {
      if (product) {
        product.remove((errorRemoving, productRemoved) => {
          if (errorRemoving) {
            res.send(errorRemoving);
          } else {
            res.send(productRemoved);
          }
        });
      } else {
        res.send();
      }
    }
  });
};

export const addProduct = (req: Request, res: Response) => {
  const body = { ...req.body, createdAt: new Date() };
  new Product(body).save((err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.send(product);
    }
  });
};
