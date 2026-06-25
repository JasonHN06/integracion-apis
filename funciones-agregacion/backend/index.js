const express = require("express");
const cors = require("cors");
const { Op, fn, col } = require("sequelize");
require("./db/connection");
const Products = require("./modelos/Product");
const app = express();

app.use(cors());
app.use(express.json());

// Grafico 1. Representar a través de un gráfico Lineal (Line Chart) el valor promedio de productos por categoría
/* SELECT 
    categoryCode AS categoria,
    AVG(value) AS valor_promedio
FROM product
WHERE value IS NOT NULL
GROUP BY categoryCode
ORDER BY categoryCode;  */
app.get("/api/graficos/promedio-productos-categoria", async (req, res) => {
  try {
    const data = await Products.findAll({
      attributes: [
        ["categoryCode", "categoria"],
        [fn("AVG", col("value")), "valor_promedio"],
      ],
      where: {
        value: {
          [Op.ne]: null,
        },
      },
      group: ["categoryCode"],
      order: [["categoryCode", "ASC"]],
      raw: true,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo promedio por categoría",
      error: error.message,
    });
  }
});

// Grafico 2. Representar a través de un gráfico de Pie Chart la cantidad de productos por marca
/* SELECT 
    brandCode AS marca,
    COUNT(*) AS cantidad_productos
FROM product
GROUP BY brandCode
ORDER BY cantidad_productos DESC; */
app.get("/api/graficos/productos-por-marca", async (req, res) => {
  try {
    const data = await Products.findAll({
      attributes: [
        ["brandCode", "marca"],
        [fn("COUNT", col("brandCode")), "cantidad_productos"],
      ],
      group: ["brandCode"],
      order: [[fn("COUNT", col("brandCode")), "DESC"]],
      raw: true,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo productos por marca",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
