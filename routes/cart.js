const express = require("express");

const router = express.Router();

const CartController = require("../app/controller/cart.controller");
const CartValidator = require("../app/validator/cart.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /cart:
 *  get:
 *     tags:
 *     - Cart
 *     summary: Get all product in cart
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
router.get("/cart", AuthMiddleware, CartController.index);
/**
 * @openapi
 * /cart/add:
 *  post:
 *     tags:
 *     - Cart
 *     summary: Add product to cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *              - quantity
 *            properties:
 *              product_id:
 *               type: string
 *              quantity:
 *               type: number
 *               example: 1
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
  "/cart/add",
  AuthMiddleware,
  CartValidator.addProduct2Cart,
  CartController.addProduct2Cart
);

/**
 * @openapi
 * /cart/update:
 *  put:
 *     tags:
 *     - Cart
 *     summary: Update product from cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *              - quantity
 *            properties:
 *              product_id:
 *               type: string
 *              quantity:
 *               type: number
 *               example: 1
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
router.put(
  "/cart/update",
  AuthMiddleware,
  CartValidator.updateProductFromCart,
  CartController.updateProductFromCart
);

/**
 * @openapi
 * /cart/subtract:
 *  delete:
 *     tags:
 *     - Cart
 *     summary: Subtract product from cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *              - quantity
 *            properties:
 *              product_id:
 *               type: string
 *              quantity:
 *               type: number
 *               example: 1
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
router.delete(
  "/cart/subtract",
  AuthMiddleware,
  CartValidator.subtractProductFromCart,
  CartController.subtractProductFromCart
);

/**
 * @openapi
 * /cart/remove:
 *  delete:
 *     tags:
 *     - Cart
 *     summary: Remove product from cart
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - product_id
 *            properties:
 *              product_id:
 *               type: string
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
router.delete(
  "/cart/remove",
  AuthMiddleware,
  CartValidator.removeProductFromCart,
  CartController.removeProductFromCart
);

module.exports = router;
