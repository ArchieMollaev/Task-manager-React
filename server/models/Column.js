const Column = (sequelize, DataTypes) => (
  sequelize.define('Column', {
    name: {
      type: DataTypes.STRING,
    },
  })
);

export default Column;
