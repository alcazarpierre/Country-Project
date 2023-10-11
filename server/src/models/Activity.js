const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: {
              args: [[1, 2, 3, 4, 5]],
              msg: 'El valor debe estar entre 1 y 5.',
            },
          },
    },
    time_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 

    season: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['verano', 'otoño', 'invierno', 'primavera']],
            msg: 'El valor debe ser una de las siguientes temporadas: verano, otoño, invierno, primavera.',
          },
        },
      },

  },
  {timestamps: false}
  );
};