// controllers/junctionController.js

const { Junction } = require("../models");

const createJunction = async (idPersoana, idMasina) => {
  try {
    const junction = await Junction.create({
      id_persoana: idPersoana,
      id_masina: idMasina,
    });
    return junction;
  } catch (error) {
    console.error("Error creating junction:", error);
    throw error;
  }
};

const getJunctionById = async (junctionId) => {
  try {
    const junction = await Junction.findByPk(junctionId);
    return junction;
  } catch (error) {
    console.error("Error getting junction by ID:", error);
    throw error;
  }
};

const getAllJunctions = async () => {
  try {
    const junctions = await Junction.findAll();
    return junctions;
  } catch (error) {
    console.error("Error getting all junctions:", error);
    throw error;
  }
};

const updateJunction = async (junctionId, newData) => {
  try {
    const junction = await Junction.findByPk(junctionId);
    if (junction) {
      await junction.update(newData);
      return junction;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating junction:", error);
    throw error;
  }
};

const deleteJunction = async (junctionId) => {
  try {
    const junction = await Junction.findByPk(junctionId);
    if (junction) {
      await junction.destroy();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error deleting junction:", error);
    throw error;
  }
};

module.exports = {
  createJunction,
  getJunctionById,
  getAllJunctions,
  updateJunction,
  deleteJunction,
};
