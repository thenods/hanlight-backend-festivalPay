import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import Charge from "@Model/charge.model";
import Admin from "@Model/admin.model";
import User from "@Model/user.model";

import { ApproveDepositRequest } from "./_validation";

const approveDeposit = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;
  const { charge_pk }: ApproveDepositRequest['body'] = req.body;

  try {
    const charge: Charge = await Charge.findOne({
      where: {
        pk: charge_pk,
        admin_pk: admin.pk,
        confirmed: false,
      },
    });

    if (!charge) {
      next( new CustomError({ name: 'Wrong_Data' }));
      
      return;
    }

    await charge.update({
      confirmed: true,
    });

    const user: User = await User.findOne({ where: { pk: charge.user_pk } });
    await user.update({
      money: user.money + charge.amount,
    });

    res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default approveDeposit;
