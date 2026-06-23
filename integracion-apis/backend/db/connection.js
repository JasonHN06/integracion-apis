const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("examen2Q2", "root", "123456789", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Conexión exitosa"))
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

module.exports = sequelize;
