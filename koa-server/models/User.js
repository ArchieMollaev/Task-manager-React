const User = (sequelize, DataTypes) => (
  sequelize.define('User', {
    login: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  })
);

export default User;

