import jwt from "jsonwebtoken";

import authConfig from "../config/auth";

import User from "../models/User";

import bcrypt from "bcrypt";

class SessionController {
  async store(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.json({ error: "E-mail not found" });
    }

    const { password } = user;

    if (!bcrypt.compareSync(req.body.password, password)) {
      return res.send({ error: "Password is invalid" });
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
