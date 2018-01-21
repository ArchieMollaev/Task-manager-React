const Users = (sequelize, DataTypes) => (
  sequelize.define('Users', {
    login: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  })
);

export default Users;