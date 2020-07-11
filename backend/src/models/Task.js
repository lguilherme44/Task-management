import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        macaddress: Sequelize.STRING,
        type: Sequelize.NUMBER,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        when: Sequelize.DATE,
        done: Sequelize.BOOLEAN,
        userId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    Task.associate = function (models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return this;
  }
}

export default Task;
