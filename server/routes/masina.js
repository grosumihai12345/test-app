// routes/masina.js

const express = require("express");
const router = express.Router();
const masinaController = require("../controllers/masinaController");

router.post("/masini", async (req, res) => {
  try {
    const {
      denumireMarca,
      denumireModel,
      anFabricatie,
      capacitateCilindrica,
      taxaImpozit,
    } = req.body;
    const masina = await masinaController.createMasina(
      denumireMarca,
      denumireModel,
      anFabricatie,
      capacitateCilindrica,
      taxaImpozit
    );
    res.status(201).json(masina);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/masini/:id", async (req, res) => {
  try {
    const masinaId = req.params.id;
    const masina = await masinaController.getMasinaById(masinaId);
    if (masina) {
      res.status(200).json(masina);
    } else {
      res.status(404).json({ error: "Masina not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/masini", async (req, res) => {
  try {
    const masini = await masinaController.getAllMasini();
    res.status(200).json(masini);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/masini/:id", async (req, res) => {
  try {
    const masinaId = req.params.id;
    const newData = req.body;
    const masina = await masinaController.updateMasina(masinaId, newData);
    if (masina) {
      res.status(200).json(masina);
    } else {
      res.status(404).json({ error: "Masina not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/masini/:id", async (req, res) => {
  try {
    const masinaId = req.params.id;
    const result = await masinaController.deleteMasina(masinaId);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Masina not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
