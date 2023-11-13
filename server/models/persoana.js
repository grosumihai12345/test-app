module.exports = (sequelize, DataType) => {
  const Persoana = sequelize.define("Persoana", {
    nume: {
      type: DataType.STRING,
      allowNull: false,
    },
    prenume: {
      type: DataType.STRING,
      allowNull: false,
    },
    cnp: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    varsta: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

  Persoana.associate = (models) => {
    Persoana.belongsToMany(models.Masina, {
      through: "Junction",
      foreignKey: "id_persoana",
    });
  };

  return Persoana;
};
