const express = require("express");
const cors = require("cors");
const sequelize = require("./db/connection");
const app = express();
const Products = require("./modelos/Product");

app.use(cors());
app.use(express.json());

// Ejercicio -- 1. Contar productos en la tabla
// select count(*) as total_productos from product;
app.get("/total-productos", async (req, res) => {
  try {
    const total_productos = await Products.count();
    if (total_productos > 0) {
      return res.status(200).json({
        message: "Total de productos obtenidos correctamente",
        data: { total_productos },
      });
    } else {
      res.status(404).json({ message: "No se encontraron products" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener products", error: error.message });
  }
});

// Ejercicio -- 2. Calcular el valor total de todos los productos
//select sum(value) as valor_total from product;
app.get("/valor-total-productos", async (req, res) => {
  try {
    const valor_total = await Products.sum("value");
    if (valor_total > 0) {
      return res.status(200).json({
        message: "Valor total de productos obtenido correctamente",
        data: { valor_total },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener products", error: error.message });
  }
});

// Ejercicio -- 8. Obtener el valor total de los productos por productType
// select productType, sum(value) as valor_total from product
// group by productType;
app.get("/valor-total-productos-por-tipo", async (req, res) => {
  try {
    const valor_total_por_tipo = await Products.findAll({
      attributes: [
        "productType",
        [sequelize.fn("sum", sequelize.col("value")), "valor_total"],
      ],
      group: ["productType"],
    });
    if (valor_total_por_tipo.length > 0) {
      return res.status(200).json({
        message: "Valor total de productos por tipo obtenido correctamente",
        data: valor_total_por_tipo,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener products", error: error.message });
  }
});

// Ejercicio -- 10. Calcular el valor promedio de productos por cada categoryCode
//select categoryCode, avg(value) as promedio from product
//group by categoryCode;
app.get("/valor-promedio-productos-por-categoria", async (req, res) => {
  try {
    const valor_promedio_por_categoria = await Products.findAll({
      attributes: [
        "categoryCode",
        [sequelize.fn("avg", sequelize.col("value")), "promedio"],
      ],
      group: ["categoryCode"],
    });
    if (valor_promedio_por_categoria.length > 0) {
      return res.status(200).json({
        message:
          "Valor promedio de productos por categoria obtenido correctamente",
        data: valor_promedio_por_categoria,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener products", error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
