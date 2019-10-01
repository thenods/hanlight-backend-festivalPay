import { Request, Response, NextFunction } from "express";

import User from "@Model/user.model";
import Charge from "@Model/charge.model";
import Admin from "@Model/admin.model";

import { HanlightUser } from "@Lib/types";

import CustomError from "@Middleware/error/customError";

import { PostMoneyParams } from "./_validation";

const postMoney = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;
  const target: HanlightUser = res.locals.targetUser;
  const { amount }: PostMoneyParams['body'] = req.body;

  if (process.env.NODE_ENV === 'production' && admin.user_pk === target.pk) {
    next(new CustomError({ name: 'Forbidden'}));

    return;
  }

  try {
    await User.findOrCreate({
      where: { pk: target.pk },
      defaults: {
        pk: target.pk,
        name: target.name,
        major: target.major,
        grade: target.grade,
        classNum: target.classNum,
        studentNum: target.studentNum,
      },
    });

    const charge: Charge = await Charge.create({
      admin_pk: admin.pk,
      user_pk: target.pk,
      user_name: target.name,
      amount,
    });

    res.json({
      success: true,
      data: {
        charge,
      },
    });
    
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default postMoney;
