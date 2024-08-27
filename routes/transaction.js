// const express = require("express");
// const router = express.Router();

// const TransactionController = require("../app/controller/transaction.controller");
// const AuthMiddleware = require("../middleware/auth.middleware");

// /**
//  * @openapi
//  * /cart/checkout:
//  *  post:
//  *     tags:
//  *     - Transaction
//  *     summary: checkout product in cart
//  *     security:
//  *	     - bearerAuth: []
//  *     responses:
//  *      200:
//  *        description: Success
//  *      404:
//  *        description: Not Found
//  *      500:
//  *        description: Server Error
//  */
//  router.post(
//     "/cart/checkout",
//     AuthMiddleware,
//     TransactionController.checkout
//   );

//   module.exports = router;