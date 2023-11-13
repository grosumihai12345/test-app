// routes/persoana.js

const express = require("express");
const router = express.Router();
const persoanaController = require("../controllers/persoanaController");

router.post("/persoane", async (req, res) => {
  try {
    const { nume, prenume, cnp, varsta } = req.body;
    const persoana = await persoanaController.createPersoana(
      nume,
      prenume,
      cnp,
      varsta
    );
    res.status(201).json(persoana);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/persoane/:id", async (req, res) => {
  try {
    const persoanaId = req.params.id;
    const persoana = await persoanaController.getPersoanaById(persoanaId);
    if (persoana) {
      res.status(200).json(persoana);
    } else {
      res.status(404).json({ error: "Persoana not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/persoane", async (req, res) => {
  try {
    const persoane = await persoanaController.getAllPersoane();
    res.status(200).json(persoane);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/persoane/:id", async (req, res) => {
  try {
    const persoanaId = req.params.id;
    const newData = req.body;
    const persoana = await persoanaController.updatePersoana(
      persoanaId,
      newData
    );
    if (persoana) {
      res.status(200).json(persoana);
    } else {
      res.status(404).json({ error: "Persoana not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/persoane/:id", async (req, res) => {
  try {
    const persoanaId = req.params.id;
    const result = await persoanaController.deletePersoana(persoanaId);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Persoana not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
