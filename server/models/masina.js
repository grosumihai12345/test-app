module.exports = (sequelize, DataType) => {
  const Masina = sequelize.define("Masina", {
    denumireMarca: {
      type: DataType.STRING,
      allowNull: false,
    },
    denumireModel: {
      type: DataType.STRING,
      allowNull: false,
    },
    anFabricatie: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    capacitateCilindrica: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    taxaImpozit: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  Masina.associate = (models) => {
    Masina.belongsToMany(models.Persoana, {
      through: "Junction",
      foreignKey: "id_masina",
    });
  };

  return Masina;
};
