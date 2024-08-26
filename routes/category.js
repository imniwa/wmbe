const express = require("express");

const router = express.Router();

const CategoryController = require("../app/controller/category.controller");
const CategoryValidator = require("../app/validator/category.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /category:
 *  get:
 *   tags:
 *      - Category
 *   summary: Get all category
 *   security:
 *      - bearerAuth: []
 *   responses:
 *      200:
 *          description: Success
 *      404:
 *          description: Not Found
 *      500:
 *          description: Server Error
 */
router.get("/category", AuthMiddleware, CategoryController.index);

/**
 * @openapi
 * /category:
 *  post:
 *   tags:
 *     - Category
 *   summary: Add Category
 *   security:
 *	     - bearerAuth: []
 *   requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
 *   responses:
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
  "/category",
  AuthMiddleware,
  CategoryValidator.store,
  CategoryController.store
);

module.exports = router;
