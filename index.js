const fs = require("fs");

//Creacion de la clase contenedor:
class Contenedor {
  #contenido;
  #ruta;
  #getingID;
  //Declarando método constructor
  constructor(ruta) {
    this.#contenido = [];
    this.#ruta = ruta;
    this.#getingID = null;
  }
  //metodo: para guardar objetos. Correcto.
  async save(object) {
    this.#contenido.push(object);
    await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#contenido));
  }
  //metodo: para encontrar por numero de id. Correcto
  async getById(n) {
    this.#contenido.forEach((element) => {
      if (element.id === n) {
        this.#getingID = element;
      }
    });
    return this.#getingID;
    //segunda opción no se cuál es mas conveniente.
    // const idFind = await this.#contenido.find(o => o.id === n)
    // return idFind
  }
  //metodo: para traer todos los datos almacenados. Correcto
  async getAll() {
    this.#contenido = JSON.parse(
      await fs.promises.readFile(this.#ruta, "utf-8")
    );
    return this.#contenido;
  }
  //metodo:para eliminar por Id
  async deleteById(n) {
    this.#contenido.forEach((element) => {
      if (element.id === n) {
        let i = this.#contenido.indexOf(element);
        if (i === 0) {
          this.#contenido.splice(i, 1);
        }
        this.#contenido.splice(i, i);
      }
    });
    await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#contenido));
  }
  //metodo: para eliminar todo los objetos. Correcto
  async deleteAll() {
    while (this.#contenido.length >= 1) {
      this.#contenido.pop();
    }
    await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#contenido));
  }
  async randomId() {
    let eventosPosibles = this.#contenido.length;
   
    let azar = 0;
    while (azar < 1) {
      azar = Math.round(eventosPosibles * Math.random());
    }
    let objetoAzar = this.#contenido[azar - 1];
    return objetoAzar;
  }
}
async function test() {
  const rutaArchivo = "./elementos.txt";
  await fs.promises.writeFile(rutaArchivo, "[]");
  const nuevoContenedor = new Contenedor(rutaArchivo);
  await nuevoContenedor.save({
    id: 1,
    title: "El numero Uno",
    price: 100,
    thumbnail: "www.imagen1.com",
  });
  await nuevoContenedor.save({
    id: 2,
    title: "El numero Dos",
    price: 150,
    thumbnail: "www.imagen2.com",
  });
  await nuevoContenedor.save({
    id: 3,
    title: "El numero Tres",
    price: 200,
    thumbnail: "www.imagen3.com",
  });
  await nuevoContenedor.save({
    id: 4,
    title: "El numero Cuatro",
    price: 200,
    thumbnail: "www.imagen4.com",
  });
  await nuevoContenedor.save({
    id: 5,
    title: "El numero Cinco",
    price: 200,
    thumbnail: "www.imagen5.com",
  });
  
    return nuevoContenedor;
}

module.exports = {test}
