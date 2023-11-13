// controllers/persoanaController.js

const { Persoana, Junction } = require("../models");

const createPersoana = async (nume, prenume, cnp, varsta) => {
  try {
    const persoana = await Persoana.create({ nume, prenume, cnp, varsta });
    return persoana;
  } catch (error) {
    console.error("Error creating persoana:", error);
    throw error;
  }
};

const getPersoanaById = async (persoanaId) => {
  try {
    const persoana = await Persoana.findByPk(persoanaId);
    return persoana;
  } catch (error) {
    console.error("Error getting persoana by ID:", error);
    throw error;
  }
};

const getAllPersoane = async () => {
  try {
    const persoane = await Persoana.findAll();
    return persoane;
  } catch (error) {
    console.error("Error getting all persoane:", error);
    throw error;
  }
};

const updatePersoana = async (persoanaId, newData) => {
  try {
    const persoana = await Persoana.findByPk(persoanaId);
    if (persoana) {
      await persoana.update(newData);
      return persoana;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating persoana:", error);
    throw error;
  }
};

const deletePersoana = async (persoanaId) => {
  try {
    const persoana = await Persoana.findByPk(persoanaId);
    if (persoana) {
      await persoana.destroy();
      await Junction.destroy({ where: { id_persoana: persoanaId } });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting persoana:", error);
    throw error;
  }
};

module.exports = {
  createPersoana,
  getPersoanaById,
  getAllPersoane,
  updatePersoana,
  deletePersoana,
};
