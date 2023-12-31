import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { loginUserParams } from "../../../validations/userJoi";
import User from "../../../models/User";
import { jwtSecret } from "../../../environment/config";

export async function LoginUserHandle(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const params = {
      email: req.body.email as string,
      password: req.body.password as string,
    };
    const { value, error } = loginUserParams.validate(params);
    if (error) {
      console.log(error);
      res.status(401).send(error);
      return;
    }
    const findUserByEmail = await User.findOne({
      where: { email: value.email },
    });
    if (findUserByEmail) {
      const password = findUserByEmail.dataValues.password;
      const match = await bcrypt.compare(value.password, password);
      if (match) {
        const token = jwt.sign(
          { email: value.email, id: findUserByEmail.dataValues.id },
          jwtSecret,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).send({ token: token });
        return;
      } else {
        res.status(400).send(`Wrong user`);
        return;
      }
    }
    res.status(404).send(`No user found with ${value.email}`);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
