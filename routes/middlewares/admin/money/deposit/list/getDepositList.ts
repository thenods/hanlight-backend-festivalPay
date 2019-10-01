import { Request, Response, NextFunction } from "express";

import CustomError from "@Middleware/error/customError";

import Charge from "@Model/charge.model";
import Admin from "@Model/admin.model";

const getDepositList = async (req: Request, res: Response, next: NextFunction) => {
  const admin: Admin = res.locals.admin;

  try {
    const charge = await Charge.findAll({ where: { admin_pk: admin.pk, confirmed: false } });

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

export default getDepositList;
