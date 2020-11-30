import Task from '../models/Task';
import { Op } from 'sequelize';

const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require('date-fns');

const current = new Date();

class TaskController {
  async store(req, res) {
    const {
      macaddress,
      type,
      title,
      description,
      when,
      done,
      userId,
    } = req.body;

    const task = await Task.create({
      macaddress,
      type,
      title,
      description,
      when,
      done,
      userId,
    });

    return res.send({ task });
  }

  async update(req, res) {
    const taskId = req.params.task;

    const task = await Task.findByPk(taskId);

    await task
      .update(req.body)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async all(req, res) {
    const tasks = await Task.findAll({
      where: { userId: req.params.id },
      order: [['when', 'ASC']],
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }

  async show(req, res) {
    await Task.findByPk(req.params.id)
      .then((response) => {
        if (response) return res.status(200).json(response);
        else return res.status(404).json({ error: 'Tarefa não encontrada' });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async delete(req, res) {
    await Task.destroy({ where: { id: req.params.task } })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async done(req, res) {
    await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { done: req.params.done },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async late(req, res) {
    await Task.findAll({
      // where: { when: { [Op.lt]: current } },
      where: {
        when: { [Op.lt]: current },
        userId: { [Op.eq]: req.params.id },
        done: { [Op.ne]: true },
      },
    })
      // .sort('when')
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async today(req, res) {
    await Task.findAll({
      where: {
        userId: req.params.id,
        when: { [Op.gte]: startOfDay(current), [Op.lte]: endOfDay(current) },
      },
      order: [['when', 'ASC']],
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async week(req, res) {
    await Task.findAll({
      where: {
        userId: req.params.id,
        when: { [Op.gte]: startOfWeek(current), [Op.lte]: endOfWeek(current) },
      },
      order: [['when', 'ASC']],
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async month(req, res) {
    await Task.findAll({
      where: {
        userId: req.params.id,
        when: {
          [Op.gte]: startOfMonth(current),
          [Op.lte]: endOfMonth(current),
        },
      },
      order: [['when', 'ASC']],
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  async year(req, res) {
    await Task.findAll({
      where: {
        userId: req.params.id,
        when: { [Op.gte]: startOfYear(current), [Op.lte]: endOfYear(current) },
      },
      order: [['when', 'ASC']],
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
}

module.exports = new TaskController();
