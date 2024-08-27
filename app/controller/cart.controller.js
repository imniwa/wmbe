const knex = require("../../config/database");
const { decodeToken } = require("../../library/helper/token");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  let token = req.headers.authorization;
  let user_id = decodeToken(token);
  if (!user_id) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const trx = await knex.transaction({ readOnly: true });
  try {
    let cart = await Cart.query(trx).where("user_id", user_id).first();
    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    let products = await CartDetails.query(trx).where("cart_id", cart.id);

    await trx.commit();
    return res.status(200).send({
      message: "Cart index",
      data: {
        cart: cart,
        products: products,
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

// add product to cart
const addProduct2Cart = async (req, res) => {
  let token = req.headers.authorization;
  let user_id = decodeToken(token);

  if (!user_id) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

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

    let cart = await Cart.query(trx).where("user_id", user_id).first();
    if (!cart) {
      cart = await Cart.query(trx).insert({
        user_id: user_id,
        total_amount: 0,
      });
    }

    // calculate total price and add to total amount
    let total_price = product.price * quantity;
    let total_amount = cart.total_amount + total_price;
    await Cart.query(trx).patchAndFetchById(cart.id, { total_amount });

    let product_in_cart = await CartDetails.query(trx)
      .where({
        cart_id: cart.id,
        product_id: product_id,
      })
      .first();

    if (!product_in_cart) {
      // add product to cart if product not exist
      product_in_cart = await CartDetails.query(trx).insert({
        cart_id: cart.id,
        product_id: product_id,
        quantity: quantity,
        total_price: total_price,
      });

      await trx.commit();

      return res.status(200).send({
        message: "Product added to cart",
        data: product_in_cart,
      });
    }

    // update product quantity if product exist in cart
    product_in_cart = await CartDetails.query(trx).patchAndFetchById(
      product_in_cart.id,
      {
        quantity: product_in_cart.quantity + quantity,
        total_price: product_in_cart.total_price + total_price,
      }
    );

    await trx.commit();

    return res.status(200).send({
      message: "Product updated in cart",
      data: product_in_cart,
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
  let token = req.headers.authorization;
  let user_id = decodeToken(token);

  if (!user_id) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

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

    let cart = await Cart.query(trx).where("user_id", user_id).first();
    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    let product_in_cart = await CartDetails.query(trx)
      .where({
        cart_id: cart.id,
        product_id: product_id,
      })
      .first();
    if (!product_in_cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found in cart",
      });
    }

    // subtract total amount from cart with previous product total price
    let total_amount = cart.total_amount - product_in_cart.total_price;

    // add total amount with new product total price
    let total_price = product.price * quantity;
    total_amount = total_amount + total_price;
    await Cart.query(trx).patchAndFetchById(cart.id, { total_amount });
    product_in_cart = await CartDetails.query(trx).patchAndFetchById(
      product_in_cart.id,
      {
        quantity: quantity,
        total_price: total_price,
      }
    );

    await trx.commit();

    return res.status(200).send({
      message: "Product updated in cart",
      data: product_in_cart,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const subtractProductFromCart = async (req, res) => {
  let token = req.headers.authorization;
  let user_id = decodeToken(token);

  if (!user_id) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

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

    let cart = await Cart.query(trx).where("user_id", user_id).first();
    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    let product_in_cart = await CartDetails.query(trx)
      .where({
        cart_id: cart.id,
        product_id: product_id,
      })
      .first();
    if (!product_in_cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found in cart",
      });
    }

    if (product_in_cart.quantity <= quantity) {
      await trx.rollback();
      return res.status(400).send({
        message: "Quantity of the product cannot less than 0",
      });
    }

    // subtract total amount from cart with previous product total price
    let total_amount = cart.total_amount - product_in_cart.total_price;
    let total_price = product.price * (product_in_cart.quantity - quantity);
    // add total amount with new product total price
    total_amount = total_amount + total_price;

    await Cart.query(trx).patchAndFetchById(cart.id, { total_amount });
    product_in_cart = await CartDetails.query(trx).patchAndFetchById(
      product_in_cart.id,
      {
        quantity: product_in_cart.quantity - quantity,
        total_price: total_price,
      }
    );

    await trx.commit();

    return res.status(200).send({
      message: "Product reduced from cart",
      data: product_in_cart,
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
  let token = req.headers.authorization;
  let user_id = decodeToken(token);

  if (!user_id) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const { product_id } = req.body;

  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let cart = await Cart.query(trx).where("user_id", user_id).first();
    if (!cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Cart not found",
      });
    }

    let product_in_cart = await CartDetails.query(trx)
      .where({
        cart_id: cart.id,
        product_id: product_id,
      })
      .first();
    if (!product_in_cart) {
      await trx.rollback();
      return res.status(404).send({
        message: "Product not found in cart",
      });
    }

    // subtract total amount from cart with previous product total price
    let total_amount = cart.total_amount - product_in_cart.total_price;
    await Cart.query(trx).patchAndFetchById(cart.id, { total_amount });
    await CartDetails.query(trx).deleteById(product_in_cart.id);
    await trx.commit();
    return res.status(200).send({
      message: "Product removed from cart",
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
  subtractProductFromCart,
  updateProductFromCart,
  removeProductFromCart,
};
