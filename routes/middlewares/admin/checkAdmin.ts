import { Request, Response, NextFunction } from "express";

import Admin from "@Model/admin.model";

import CustomError from "@Middleware/error/customError";

import { HanlightUser } from "@Lib/types";

type type = 'response' | 'middleware'

const checkAdmin = (type: type) => async (req: Request, res: Response, next: NextFunction) => {
  const { pk }: HanlightUser = res.locals.user;

  try {
    const admin: Admin | undefined = await Admin.findOne({ where: { user_pk: pk } });
    
    if (type === 'response') {
      res.json({
        success: true,
        data: {
          adminBool: Boolean(admin),
        },
      });
    } else if (Boolean(admin)) {
      res.locals.admin = admin;
      next();
    } else {
      next(new CustomError({ name: 'Forbidden' }));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default checkAdmin;
