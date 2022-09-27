const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('favorites', {
    id:{
      type:DataTypes.STRING,  //Va a ser ccn3 de  la api
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag_img:{
      type: DataTypes.STRING,
      allowNull:false
    },
    continent:{
      type: DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull:false
    },
    district:{
      type: DataTypes.STRING,
      allowNull:true
    },
    area:{
      type: DataTypes.STRING,
      allowNull:true
    },
    population:{
      type: DataTypes.STRING,
      allowNull:true
    },
  },
  {
    timestamps:false
  });
};
