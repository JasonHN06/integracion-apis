const express = require("express");
const app = express();

app.use(express.json());

const asignaturasRoutes = require("./routes/asignaturas.routes");
app.use("/asignaturas", asignaturasRoutes);

const maestrosRoutes = require("./routes/maestros.routes");
app.use("/maestros", maestrosRoutes);

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});
