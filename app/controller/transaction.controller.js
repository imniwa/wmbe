const knex = require("../../config/database");
const Cart = require("../model/cart.model");
const Transaction = require("../model/transaction.model");

const index = async (req, res) => {
  const { id: user_id } = req.user;
  const trx = await knex.transaction({ readOnly: true });
  try {
    const transactions = await Transaction.query(trx)
      .where("user_id", user_id)
      .withGraphFetched("cart")
      .orderBy("date", "desc");

    await trx.commit();
    return res.status(200).send({
      status: 200,
      message: "Transaction list",
      data: transactions,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const checkout = async (req, res) => {
  const { id: user_id } = req.user;
  const trx = await knex.transaction({ isolationLevel: "read committed" });

  try {
    let cart = await Cart.query(trx)
      .where({
        user_id,
      })
      .whereNull("transaction_id");

    if (cart.length < 1) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart is empty!",
      });
    }

    let total_amount = 0;
    cart.map((item) => {
      total_amount += item.total_price;
    });

    let transaction = await Transaction.query(trx).insert({
      user_id,
      total_amount,
      date: new Date(),
    });

    await Cart.query(trx)
      .where({
        user_id,
      })
      .whereNull("transaction_id")
      .patch({
        transaction_id: transaction.id,
      });

    await trx.commit();
    return res.status(200).json({
      message: "Transaction success!",
      data: transaction,
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
  index,
  checkout,
};
