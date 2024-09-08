import express from "express";
import prisma from "../db/db.config";

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
  try {
    const userId = req.params.userId;
    const homes = await prisma.home.findMany({
      where: {
        userid: parseInt(userId),
      },
    });
    if (homes.length === 0) {
      return res.status(404).json({ message: "No homes found for this user" });
    }
    return res.json(homes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/* ALTERNATE FOR DOCKER - MYSQL INSTANCE

export const findByUser = async (
  req: express.Request,
  res: express.Response
) => {
  const userId = req.params.userId;
  const homes = await prisma.home.findMany({
    where: {
      user_home_interest: {
        some: { user_id: parseInt(userId) },
      },
    },
    include: {
      user_home_interest: true,
    },
  });
  res.json(homes);
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
*/

// FIND USERS BY HOME: /user/find-by-home/:homeId

export const findByHome = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    
  }
};

/* ALTERNATE FOR DOCKER - MYSQL INSTANCE
export const findByHome = async (
  req: express.Request,
  res: express.Response
) => {
  const homeId = req.params.homeId;
  const users = await prisma.user.findMany({
    where: {
      user_home_interest: {
        some: { home_id: parseInt(homeId) },
      },
    },
    include: {
      user_home_interest: true,
    },
  });
  res.json(users);
  try {
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
*/

// Update Users for a home: /home/update-users/:homeId
export const updateUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const { homeId } = req.params;
  const { userIds } = req.body;

  try {
    // Take new input
    const newHomeId = parseInt(homeId);
    const newUserIds = userIds.map((id: number) => parseInt(id.toString()));

    // Delete existing relationships for this home

    await prisma.user_home_interest.deleteMany({
      where: {
        home_id: newHomeId,
      },
    });
    // Create new relationships

    const userHomeInterests = newUserIds.map((userId: number) => ({
      home_id: newHomeId,
      user_id: userId,
    }));

    await prisma.user_home_interest.createMany({
      data: userHomeInterests,
    });

    res.json({ message: "Users updated for home" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
