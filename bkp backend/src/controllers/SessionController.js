import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

import User from '../models/User';

import bcrypt from 'bcrypt';

class SessionController {
  async store(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const { password } = user;

    if (!bcrypt.compareSync(req.body.password, password)) {
      return res.status(401).send({ error: 'Password is invalid' });
    }

    const { id, name, email } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
