const knex = require("../../config/database");
const { decodeToken } = require("../../library/helper/token");
const Cart = require("../model/cart.model");
const CartDetails = require("../model/carts_detail.model");
const Transaction = require("../model/transaction.model");
const TransactionDetails = require("../model/transaction_detail.model");

const checkout = async (req, res) => {
  let token = req.headers.authorization;
  let user_id = decodeToken(token);
  if (!user_id) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    const cart = await Cart.query(trx).where("user_id", user_id).first();
    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart empty",
      });
    }

    const cartDetails = await CartDetails.query(trx).where("cart_id", cart.id);
    if (!cartDetails.length) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart empty",
      });
    }

    await Cart.query(trx).deleteById(cart.id);

    const transaction = await Transaction.query(trx).insert(cart);
    const transactionDetails = cartDetails.map((item) => ({
      transaction_id: transaction.id,
      product_id: item.product_id,
      quantity: item.quantity,
      total_price: item.total_price,
    }));
    let test = await TransactionDetails.query(trx).insertGraph(
      transactionDetails
    );
    await trx.commit();
    return res.status(200).send({
      message: "Checkout",
      data: {
        transaction: transaction,
        transactionDetails: test,
      },
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  checkout,
};
