// controllers/masinaController.js

const { Masina, Junction } = require("../models");

const createMasina = async (
  denumireMarca,
  denumireModel,
  anFabricatie,
  capacitateCilindrica,
  taxaImpozit
) => {
  try {
    const masina = await Masina.create({
      denumireMarca,
      denumireModel,
      anFabricatie,
      capacitateCilindrica,
      taxaImpozit,
    });
    return masina;
  } catch (error) {
    console.error("Error creating masina:", error);
    throw error;
  }
};

const getMasinaById = async (masinaId) => {
  try {
    const masina = await Masina.findByPk(masinaId);
    return masina;
  } catch (error) {
    console.error("Error getting masina by ID:", error);
    throw error;
  }
};

const getAllMasini = async () => {
  try {
    const masini = await Masina.findAll();
    return masini;
  } catch (error) {
    console.error("Error getting all masini:", error);
    throw error;
  }
};

const updateMasina = async (masinaId, newData) => {
  try {
    const masina = await Masina.findByPk(masinaId);
    if (masina) {
      await masina.update(newData);
      return masina;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating masina:", error);
    throw error;
  }
};

const deleteMasina = async (masinaId) => {
  try {
    const masina = await Masina.findByPk(masinaId);
    if (masina) {
      await masina.destroy();
      await Junction.destroy({ where: { id_masina: masinaId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting masina:", error);
    throw error;
  }
};

module.exports = {
  createMasina,
  getMasinaById,
  getAllMasini,
  updateMasina,
  deleteMasina,
};
