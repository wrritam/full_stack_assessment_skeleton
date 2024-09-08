import express from "express";
import prisma from "../db/db.config";
import { param, body, validationResult } from "express-validator";

//FIND ALL USERS: /user/find-all

export const findAll = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//FIND HOMES BY USER: /home/find-by-user/:userId

export const findByUser = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.params.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        homes: {
          include: {
            home: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }

    const homes = user?.homes.map((userHome: any) => userHome.home);
    if (homes?.length === 0) {
      res.status(404).json({ message: "User has no homes" });
    }
    res.json(homes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// FIND USERS BY HOME: /user/find-by-home/:homeId

export const findByHome = async (
  req: express.Request,
  res: express.Response
) => {
  const homeId = req.params.homeId;

  try {
    const home = await prisma.home.findUnique({
      where: {
        id: parseInt(homeId),
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!home) {
      res.status(404).json({ message: "Home does not exist" });
    }

    const users = home?.users.map((userHome: any) => userHome.user);
    if (users?.length === 0) {
      res.status(404).json({ message: "Home has no users" });
    }
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update Users for a home: /home/update-users/:homeId

export const updateUsers = [
  param("homeId").isInt().toInt(),
  body("userIds").isArray().withMessage("userIds must be an array"),
  body("userIds.*").isInt().toInt(),

  async (req: express.Request, res: express.Response) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const homeId = req.params.homeId;
    const { userIds } = req.body;

    try {
      // Check if the home exists

      const home = await prisma.home.findUnique({
        where: { id: parseInt(homeId) },
      });
      if (!home) {
        return res.status(404).json({ error: "Home not found" });
      }

      // Verify all userIds exist

      const users = await prisma.user.findMany({
        where: { id: { in: userIds } },
      });
      if (users.length !== userIds.length) {
        return res
          .status(400)
          .json({ error: "One or more user IDs are invalid" });
      }

      // Update the UserHome relationships

      await prisma.$transaction(async (prisma) => {
        // Remove all existing relationships for this home

        await prisma.userHome.deleteMany({
          where: { homeId: parseInt(homeId) },
        });

        // Create new relationships

        await prisma.userHome.createMany({
          data: userIds.map((userId: number) => ({
            userId,
            homeId: parseInt(homeId),
          })),
        });
      });

      res.json({ message: "Users updated successfully for the home" });
    } catch (error) {
      console.error("Error updating users for home:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];
