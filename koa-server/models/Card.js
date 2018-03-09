const Card = (sequelize, DataTypes) => (
  sequelize.define('Card', {
    position: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  })
);

export default Card;
