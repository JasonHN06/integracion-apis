const express = require("express");
const router = express.Router();
const Asignatura = require("../modelos/Asignatura");

router.get("/", async (req, res) => {
  try {
    const asignaturas = await Asignatura.findAll();
    if (asignaturas.length > 0) {
      return res.status(200).json({
        message: "Asignaturas obtenidas correctamente",
        data: asignaturas,
      });
    } else {
      res.status(404).json({ message: "No se encontraron asignaturas" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener asignaturas", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const asignatura = await Asignatura.create(req.body);
    return res.status(201).json({
      message: "Asignatura creada correctamente",
      data: asignatura,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear asignatura", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const asignatura = await Asignatura.update(req.body, {
      where: { idAsignatura: req.params.id },
    });
    return res.status(200).json({
      message: "Asignatura actualizada correctamente",
      data: asignatura,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar asignatura",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const asignatura = await Asignatura.destroy({
      where: { idAsignatura: req.params.id },
    });
    return res
      .status(200)
      .json({ message: "Asignatura eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar asignatura", error: error.message });
  }
});

module.exports = router;
