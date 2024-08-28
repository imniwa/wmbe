const express = require("express");

const router = express.Router();

const ProductController = require("../app/controller/product.controller");
const ProductValidator = require("../app/validator/product.validator");
const AuthMiddleware = require("../middleware/auth.middleware");
const uploadfile = require("../middleware/upload.middleware");

/**
 * @openapi
 * /product:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get all product
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/product", AuthMiddleware, ProductController.index);

/**
 * @openapi
 * /product/category/{category_id}:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get all product by category
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: category_id
 *       in: path
 *       description: The unique key id of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get(
  "/product/category/:category_id",
  AuthMiddleware,
  ProductController.byCategory
);

/**
 * @openapi
 * /product:
 *  post:
 *     tags:
 *     - Product
 *     summary: Add Product
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - price
 *              - thumbnail
 *              - category_id
 *            properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *               example: 10000
 *             thumbnail:
 *               type: string
 *               format: binary
 *             category_id:
 *               type: string
 *               example: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post(
  "/product",
  AuthMiddleware,
  uploadfile.single("thumbnail"),
  ProductValidator.store,
  ProductController.store
);

/**
 * @openapi
 * /product/{id}:
 *  delete:
 *     tags:
 *     - Product
 *     summary: Delete product
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the product
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/product/:id", AuthMiddleware, ProductController.destroy);

/**
 * @openapi
 * /product/image/{filename}:
 *  get:
 *    tags:
 *    - Product
 *    summary: Get product image
 *    parameters:
 *    - name: filename
 *      in: path
 *      description: filename of the product thumbnail
 *      required: true
 *    responses:
 *     200:
 *       description: Success
 *     404:
 *       description: Not Found
 *     500:
 *       description: Server Error
 */
router.get("/product/image/:filename", ProductController.showImage);

module.exports = router;
