/* Importing the `randomUUID` function from the `crypto` module. */
const { randomUUID } = require("crypto");
const { test } = require("./index");


/**
 * If the result is not found, send a 404 status and a message saying the id was not found. Otherwise,
 * send the result.
 * @param result - the result of the query
 * @param id - the id of the document to be found
 * @param res - the response object
 */
const isFound = (result, id, res) => {
  if (!result) {
    res.status(404);
    res.json({ mensaje: `no se encontró ${id}` });
  } else {
    res.json(result);
  }
};

/**
 * The function 'contenedor' is an asynchronous function that returns a promise that resolves to the
 * value returned by the function 'test'.
 * @returns the value of the variable nuevoContenedor.
 */
const contenedor = async () => {
  const nuevoContenedor = await test();
  return nuevoContenedor;
};


 //It gets all the products from the database.
const getHomePage = async(req, res) => {
  res.send("<h1>Hello World From Express</h1>");
};
const getProductsController = async (req, res) => {
  res.send(JSON.stringify(await (await contenedor()).getAll(), null, 2));
};
 //It gets an especific product from the database.
const getRandomProductController = async (req, res) => {
  res.send(JSON.stringify(await (await contenedor()).randomId(), null, 2));
};


//It gets a product by id from the database and returns it to the user.

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const result = await (await contenedor()).getById(id);
  isFound(result, id, res);
};

/**
 * It takes a request, and a response, and it creates a new product, and then it returns the product.
 */
const addNewProduct = async (req, res) => {
  const object = {
    ...req.body,
    id: randomUUID(),
  };

  if (!object?.title || !object?.price || !object?.thumbnail) {
    res.status(404);
    res.json({ mensaje: `invalid format` });
  } else {
    await (await contenedor()).save(object);
    res.status(201);
    res.send(
      JSON.stringify(await (await contenedor()).getById(object.id), null, 2)
    );
  }
};


 //It deletes a product by id.
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const result = await (await contenedor()).getById(id);
  if (!result) {
    res.status(404);
    res.json({ mensaje: `this id = ${id} doesn't exist` });
  } else {
    await (await contenedor()).deleteById(id);
    res.status(204);
    res.send();
  }
};

/**
 * It updates a product by id, if the product exists, if the product doesn't exist it returns a 404, if
 * the product exists but the object is not valid it returns a 400, if the product exists and the
 * object is valid it updates the product and returns a 204.
 */
const updateProductById = async (req, res) => {
  const { id } = req.params;
  const object = req.body;
  const result = await (await contenedor()).getById(id);
  if (!result) {
    res.status(404);
    res.json({ mensaje: `this id = ${id} doesn't exist` });
  } else {
    if (!object?.title || !object?.price || !object?.thumbnail) {
      res.status(400);
      res.json({ mensaje: `invalid format` });
    } else {
      await (await contenedor()).updateById(object);
      res.status(204);
      res.send();
    }
  }
};


module.exports = {
  getProductsController,
  getRandomProductController,
  getProductByIdController,
  addNewProduct,
  deleteProductById,
  updateProductById,
  getHomePage
};
