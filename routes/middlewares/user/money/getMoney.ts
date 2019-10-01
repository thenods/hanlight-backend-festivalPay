import { Request, Response, NextFunction } from "express";

import User from "@Model/user.model";
import { HanlightUser } from "@Lib/types";
import CustomError from "@Middleware/error/customError";
import Charge from "@Model/charge.model";

const getMoney = async (req: Request, res: Response, next: NextFunction) => {
  const hanlightUser: HanlightUser = res.locals.user;

  try {
    const user = await User.findOne({
      where: { pk: hanlightUser.pk },
      include: [
        {
          model: Charge,
          order: [["createdAt", "DESC"]],
          attributes: ["admin_name"]
        }
      ]
    });

    res.json({
      success: true,
      data: {
        user: {
          money: user ? user.money : 0,
          lastApproval: user
            ? user.charge.length
              ? user.charge[0].admin_name
              : null
            : null
        }
      }
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: "Database_Error" }));
  }
};

export default getMoney;
