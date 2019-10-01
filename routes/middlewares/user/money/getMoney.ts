import { Request, Response, NextFunction } from "express";

import User from "@Model/user.model";
import { HanlightUser } from "@Lib/types";
import CustomError from "@Middleware/error/customError";

const getMoney = async (req: Request, res: Response, next: NextFunction) => {
  const hanlightUser: HanlightUser = res.locals.user;

  try {
    const user = await User.findOne({ where: { pk: hanlightUser.pk } });

    res.json({
      success: true,
      data: {
        user: {
          money: user ? user.money : 0,
        },
      },
    });

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getMoney;
