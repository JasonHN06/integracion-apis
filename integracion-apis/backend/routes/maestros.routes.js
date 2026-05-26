const express = require("express");
const router = express.Router();
const Maestros = require("../modelos/Maestros");

router.get("/", async (req, res) => {
  try {
    const maestros = await Maestros.findAll();
    if (maestros.length > 0) {
      return res.status(200).json({
        message: "Maestros obtenidos correctamente",
        data: maestros,
      });
    } else {
      res.status(404).json({ message: "No se encontraron maestros" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener maestros", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const maestro = await Maestros.create(req.body);
    return res.status(201).json({
      message: "Maestro creado correctamente",
      data: maestro,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear maestro", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const maestro = await Maestros.update(req.body, {
      where: { idMaestro: req.params.id },
    });
    return res.status(200).json({
      message: "Maestro actualizado correctamente",
      data: maestro,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar maestro",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const maestro = await Maestros.destroy({
      where: { idMaestro: req.params.id },
    });
    return res.status(200).json({ message: "Maestro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar maestro",
      error: error.message,
    });
  }
});

module.exports = router;
