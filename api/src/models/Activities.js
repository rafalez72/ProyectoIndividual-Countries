const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
    },
    difficulty_level:{
      type: DataTypes.INTEGER,
      allowNull:true
    },
    duration:{
      type: DataTypes.STRING,
      allowNull:true
    },
    season:{
      type: DataTypes.STRING,
      allowNull:true
    }
  },
  {
    timestamps:false
  });
};
