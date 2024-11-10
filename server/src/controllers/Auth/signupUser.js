import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const client = new PrismaClient();

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: passwordHash,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong! please try again" });
  }
};

export default signupUser;
