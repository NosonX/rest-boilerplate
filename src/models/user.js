const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 50],
            msg: 'First name cannot has more than 50 characters',
          },
          notNull: { args: true, msg: 'First name is required' },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [0, 50],
            msg: 'Last name cannot has more than 50 characters',
          },
          notNull: { args: true, msg: 'Last name is required' },
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: { args: true, msg: 'Invalid email format' },
          len: {
            args: [0, 255],
            msg: 'Email cannot has more than 255 characters',
          },
          notNull: { args: true, msg: 'Email is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
