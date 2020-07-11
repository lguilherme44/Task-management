import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    User.associate = function (models) {
      User.hasMany(models.Task, { foreignKey: 'user_id' });
    };

    return this;
  }
}

export default User;
