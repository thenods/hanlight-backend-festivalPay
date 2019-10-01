import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import { CancelDepositRequest } from "./_validation";

import Admin from "@Model/admin.model";
import Charge from "@Model/charge.model";


const cancelDeposit = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;
  const { charge_pk }: CancelDepositRequest['body'] = req.body;

  try {
    const charge = await Charge.findOne({
      where: {
        pk: charge_pk,
        admin_pk: admin.pk,
        confirmed: false,
      },
    });

    if (!charge) {
      next(new CustomError({ name: 'Wrong_Data' }));

      return;
    }

    await charge.destroy();

    res.json({
      success: true,
    });

  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default cancelDeposit;
