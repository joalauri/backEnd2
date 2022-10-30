const { Router } = require("express");
const router = Router();
const fs = require("fs");
const { test } = require("../index");



const contenedor = async () => {
  const nuevoContenedor = await test();
  return nuevoContenedor;
};

router.get("/", (req, res) => {
  res.send("<h1>Hello World From Express</h1>");
});
router.get("/products", async (req, res) => {
  res.send(JSON.stringify(await (await contenedor()).getAll(),null,2));
});
router.get("/randomProducts",async (req, res) => {
  res.send(JSON.stringify(await (await contenedor()).randomId(),null,2));
});

module.exports = { router };
