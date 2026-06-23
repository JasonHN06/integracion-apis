const express = require("express");
const cors = require("cors");
const app = express();

const Productos = require("./modelos/Producto");

app.use(cors());
app.use(express.json());

app.get("/productos", async (req, res) => {
  try {
    const productos = await Productos.findAll();
    if (productos.length > 0) {
      return res.status(200).json({
        message: "Productos obtenidos correctamente",
        data: productos,
      });
    } else {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
});

app.post("/productos", async (req, res) => {
  try {
    const producto = await Productos.create(req.body);
    return res.status(201).json({
      message: "Producto creado correctamente",
      data: producto,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear producto",
      error: error.message,
    });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const eliminado = await Productos.destroy({
      where: { idProducto: req.params.id },
    });
    if (!eliminado) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    return res.status(200).json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
