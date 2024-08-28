const express = require("express");
const router = express.Router();

const TransactionController = require("../app/controller/transaction.controller");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /transaction:
 *  get:
 *     tags:
 *     - Transaction
 *     summary: show history of transaction
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
router.get("/transaction", AuthMiddleware, TransactionController.index);

/**
 * @openapi
 * /transaction:
 *  post:
 *     tags:
 *     - Transaction
 *     summary: checkout product in cart
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
router.post("/transaction", AuthMiddleware, TransactionController.checkout);

module.exports = router;
