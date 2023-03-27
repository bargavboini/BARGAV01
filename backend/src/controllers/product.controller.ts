import { Request, Response } from "express";
import ProductSchema from "../database/schemas/product.schema";

class ProductController {
  find = async (req: Request, res: Response): Promise<Response> => {
    const data = await ProductSchema.find({});
    return res.status(200).send({
      status: 200,
      data,
    });
  };
  findById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await ProductSchema.findById(req.params.id);
      return res.status(200).send({
        status: 200,
        data,
      });
    } catch (error) {
      return res.status(404).send({
        status: 404,
      });
    }
  };
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const productSchema = new ProductSchema({
        name: req.body.name,
        quantity: req.body.quantity,
      });
      const product = await productSchema.save();
      return res.status(201).send({
        status: 201,
        data: product,
      });
    } catch (error) {
      return res.status(422).send({
        status: 422,
      });
    }
  };
  updateById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const find = await ProductSchema.findById(req.params.id);
      find.name = req.body.name;
      find.quantity = req.body.quantity;
      const saved = await find.save();
      return res.status(200).send({
        status: 200,
        data: saved,
      });
    } catch (error) {
      return res.status(422).send({
        status: 422,
      });
    }
  };
  deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const find = await ProductSchema.findById(req.params.id);
      const deleted = await find.deleteOne();
      return res.status(200).send({
        status: 200,
        data: deleted,
      });
    } catch (error) {
      return res.status(422).send({
        status: 422,
      });
    }
  };
}
export const productController = new ProductController();
