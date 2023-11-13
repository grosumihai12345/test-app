const express = require("express");
const router = express.Router();
const junctionController = require("../controllers/junctionController");
const { Junction } = require("../models");

router.post("/junction", async (req, res) => {
  try {
    const { id_persoana, id_masina } = req.body;
    const junction = await junctionController.createJunction(
      id_persoana,
      id_masina
    );
    res.status(201).json(junction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/junction/:id", async (req, res) => {
  try {
    const junctionId = req.params.id;
    const newData = req.body;
    const junction = await junctionController.updateJunction(
      junctionId,
      newData
    );
    if (junction) {
      res.status(200).json(junction);
    } else {
      res.status(404).json({ error: "Junction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/junction/:id", junctionController.findJunction);
router.get("/junctions", junctionController.findAllJunctions);
router.delete("/junction/:id", junctionController.destroyJunction);

module.exports = router;
