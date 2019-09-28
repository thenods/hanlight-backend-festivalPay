import { Request, Response, NextFunction } from "express";

import Admin from "@Model/admin.model";
import User from "@Model/user.model";

import CustomError from "@Middleware/error/customError";

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { pk }: User = res.locals.user;

  try {
    const admin: Admin | undefined = await Admin.findOne({ where: { user_pk: pk } });
    
    res.json({
      success: true,
      data: {
        adminBool: Boolean(admin),
      }
    });
  } catch (error) {
    console.log(error);
    next(new CustomError({ name: 'Database_Error' }));
  }
};

export default getAdmin;
