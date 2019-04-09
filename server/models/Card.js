const Card = (sequelize, DataTypes) =>
  sequelize.define('Card', {
    // position: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   unique: false,
    // },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

export default Card;
