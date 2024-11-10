import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new PrismaClient();

const loginUser = async (req, res) => {
  try {
    //read the username and password from the client
    const email = req.body.email;
    const password = req.body.password;

    //check if the username exists in the database querrying with the database aganist the email
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({ message: "Wrong email or password" });
      return;
    }

    //if the user doesn't exist return an error
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    //if user exists compare the plain text password against the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    //if they don't match return an authentication error
    console.log(passwordMatch);
    if (!passwordMatch) {
      res.status(400).json({ message: "Wrong email or password" });
      return;
    }

    //if they match create a token, save the Id there
    const token = jwt.sign(user.id, process.env.JWT_SECRET);
    //send the token to the client as a cookie
    res.status(200).cookie("authToken", token, { httpOnly: true }).json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong! please try again" });
  }
};
export default loginUser;
