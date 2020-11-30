import User from '../models/User';
import Task from '../models/Task';

import bcrypt from 'bcrypt';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const password_hash = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: password_hash,
    });

    return res.send({ user });
  }

  async all(req, res) {
    await User.findAll()
      .then((response) => {
        return res.status(200).send(response);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  }

  async show(req, res) {
    const { user: id } = await Task.findOne({ user: req.params.id });

    await User.findById(id)
      .populate('tasks')
      .then((response) => {
        return res.status(200).send(response);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  }
}

module.exports = new UserController();
