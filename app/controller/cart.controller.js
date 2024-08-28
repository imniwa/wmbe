const knex = require("../../config/database");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  const { id: user_id } = req.user;
  const trx = await knex.transaction({ readOnly: true });
  try {
    let cart = await Cart.query(trx)
      .where("user_id", user_id)
      .whereNull("transaction_id")
      .withGraphJoined("product", {
        joinOperation: "innerJoin",
      })
      .modifyGraph("product", (builder) => {
        builder.whereNull("deleted_at");
      })
      .orderBy("created_at", "desc");

    await trx.commit();
    return res.status(200).send({
      status: 200,
      message: "Cart list",
      data: cart,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// add product to cart
const addProduct2Cart = async (req, res) => {
  const { id: user_id } = req.user;
  const { product_id, quantity } = req.body;

  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let product = await Product.query(trx).where("id", product_id).first();
    if (!product) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found",
      });
    }

    let total_price = product.price * quantity;

    let cart = await Cart.query(trx)
      .where({
        user_id,
        product_id,
      })
      .whereNull("transaction_id")
      .first();

    // if product exist in cart, update quantity and total price
    if (cart) {
      cart = await Cart.query(trx).patchAndFetchById(cart.id, {
        quantity: cart.quantity + quantity,
        total_price: cart.total_price + total_price,
      });

      await trx.commit();
      return res.status(200).send({
        status: 200,
        message: "Product updated in cart",
        data: cart,
      });
    }

    // add product to cart if product not exist in cart
    cart = await Cart.query(trx).insert({
      user_id,
      product_id,
      quantity,
      total_price,
    });

    await trx.commit();

    return res.status(200).send({
      status: 200,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// update product from cart
const updateProductFromCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { product_id, quantity } = req.body;

  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let product = await Product.query(trx).where("id", product_id).first();
    if (!product) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found",
      });
    }

    let total_price = product.price * quantity;

    let cart = await Cart.query(trx)
      .where({
        user_id,
        product_id,
      })
      .whereNull("transaction_id")
      .first();

    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found in cart",
      });
    }
    // if product exist in cart, update quantity and total price
    cart = await Cart.query(trx).patchAndFetchById(cart.id, {
      quantity,
      total_price,
    });

    await trx.commit();
    return res.status(200).send({
      status: 200,
      message: "Product updated in cart",
      data: cart,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// reduce product from cart
const reduceProductFromCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { product_id, quantity } = req.body;

  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let product = await Product.query(trx).where("id", product_id).first();
    if (!product) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found",
      });
    }

    let total_price = product.price * quantity;

    let cart = await Cart.query(trx)
      .where({
        user_id,
        product_id,
      })
      .whereNull("transaction_id")
      .first();

    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found in cart",
      });
    }

    // if quantity total is less than 1 remove product from cart
    if (cart.quantity - quantity < 1) {
      cart = await Cart.query(trx).deleteById(cart.id);

      await trx.commit();
      return res.status(200).send({
        status: 200,
        message: "Product removed from cart",
        data: cart,
      });
    }

    // if product exist in cart, update quantity and total price
    cart = await Cart.query(trx).patchAndFetchById(cart.id, {
      quantity: cart.quantity - quantity,
      total_price: cart.total_price - total_price,
    });

    await trx.commit();
    return res.status(200).send({
      status: 200,
      message: "Product updated in cart",
      data: cart,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const removeProductFromCart = async (req, res) => {
  const { id: user_id } = req.user;
  const { product_id } = req.body;

  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let cart = await Cart.query(trx)
      .where({
        user_id,
        product_id,
      })
      .whereNull("transaction_id")
      .first();

    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found in cart",
      });
    }

    cart = await Cart.query(trx).deleteById(cart.id);

    await trx.commit();
    return res.status(200).send({
      status: 200,
      message: "Product removed from cart",
      data: cart,
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
  addProduct2Cart,
  reduceProductFromCart,
  updateProductFromCart,
  removeProductFromCart,
};
