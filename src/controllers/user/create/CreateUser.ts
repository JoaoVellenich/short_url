import { Request, Response } from "express";
import { createUserParams } from "../../../validations/userJoi";
import User from "../../../models/User";

export async function CreateUserHandle(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const params = {
      email: req.body.email as string,
      password: req.body.password as string,
    };

    const { value, error } = createUserParams.validate(params);
    if (error) {
      console.log(error);
      res.status(400).send(error);
      return;
    }
    const findUserByEmail = await User.findOne({
      where: { email: value.email },
    });
    if (!findUserByEmail) {
      const date = new Date();
      await User.create({
        email: value.email,
        password: value.password,
        createdAt: date.getTime(),
        updatedAt: date.getTime(),
      });
    } else {
      res.status(400).send(`User with email: ${value.email} already exists`);
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return;
  }
}
