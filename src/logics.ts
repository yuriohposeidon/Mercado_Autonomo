import { Request, Response } from "express";
import { market } from "./database";
import { Product } from "./interface";

const getNextId = (): number => {
  const lastProduct: Product | undefined = market
    .sort((a: Product, b: Product): number => a.id - b.id)
    .at(-1);

  if (!lastProduct) return 1;

  return lastProduct.id + 1;
};

const create = (req: Request, res: Response): Response => {
  const newProduct: Product = {
    ...req.body,
    id: getNextId(),
    expirationDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};

const read = (req: Request, res: Response): Response => {
  const total: number = market.reduce(
    (initialValue: number , atualValue: Product) => {
    return initialValue + atualValue.price
  }, 0)
  return res.status(200).json({ total , products:market });
  
};

const retrieve = (req: Request, res: Response): Response => {
  const { foundProduct } = res.locals;
  return res.status(200).json(foundProduct);
};

const destroy = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

const partialUpdate = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  const updatedProducts = (market[productIndex] = {
    ...market[productIndex],
    ...req.body,
  });

  return res.status(200).json(updatedProducts);
};

export default { create, read, retrieve, destroy, partialUpdate };
