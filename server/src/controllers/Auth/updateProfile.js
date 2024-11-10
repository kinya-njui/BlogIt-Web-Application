// controllers/userController.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, username } = req.body;

    const updatedUser = await client.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        username,
      },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { previousPassword, newPassword } = req.body;

    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(previousPassword, user.password);

    if (passwordMatch) {
      const passwordHash = await bcrypt.hash(newPassword, 8);
      await client.user.update({
        where: { id: userId },
        data: {
          password: passwordHash,
        },
      });

      res.status(200).json({
        message: "Password updated successfully",
      });
    }
    res.status(400).json({ message: "Password does not match" });
    return;
  } catch (error) {
    res.status(500).json({ message: "something went wrong! please try again" });
    return;
  }
};
export { updateProfile, updateUserProfile };
